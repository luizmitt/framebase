<?php

namespace App\Http\Models;

use App\Domain\AppModel as Model;

class Auth extends Model
{
    // não faz validação do model automatico.
    public $validate = false;

    public static function getUserByAccount($account)
    {
        self::$connection = 'api';

        $user_data = self::query("SELECT    
                                    U.ID_USUARIO,
                                    U.TX_LOGIN,
                                    U.TX_EMAIL_PMM,
                                    U.ID_PESSOA_FUNCIONARIO,
                                    PF.NB_CPF,
                                    P.TX_NOME

                                FROM USUARIO U 

                                LEFT JOIN  PESSOA_FISICA PF 
                                ON U.ID_PESSOA_FUNCIONARIO = PF.ID_PESSOA

                                LEFT JOIN PESSOA P
                                ON P.ID_PESSOA = PF.ID_PESSOA
                                AND P.ID_PESSOA = U.ID_PESSOA_FUNCIONARIO               
                                WHERE ( 
                                    (UPPER(U.TX_LOGIN)=UPPER('$account')) 
                                    OR (PF.NB_CPF='$account')
                                    OR (LOWER(U.TX_EMAIL_PMM)=LOWER('$account'))
                                )")[0];
        $errors[] = self::getError();
        $picture = null;

        if (isset($user_data['ID_PESSOA_FUNCIONARIO'])) {
            $user_pic = self::query("SELECT 
                                    FPE.BL_FOTO 
                                 FROM FUNCIONARIO_PE FPE 
                                 WHERE ID_PESSOA_FUNCIONARIO = '{$user_data['ID_PESSOA_FUNCIONARIO']}'")[0];
            $erros[] = self::getError();

            $picture = base64_encode(stream_get_contents($user_pic['BL_FOTO']));
            if (strlen($picture) > 20) {
                $picture = 'data:image/jpeg;base64,'.$picture;
            }
        }

        $data = [
            'TX_NOME' => $user_data['TX_NOME'],
            'TX_EMAIL_PMM' => $user_data['TX_EMAIL_PMM'],
            'TX_LOGIN' => $user_data['TX_LOGIN'],
            'NB_CPF' => $user_data['NB_CPF'],
            'ID_USUARIO' => $user_data['ID_USUARIO'],
            'ID_PESSOA_FUNCIONARIO' => $user_data['ID_PESSOA_FUNCIONARIO'],
            'BL_FOTO' => $picture,
        ];

        if (empty($erros) && !empty($user_data)) {
            return json_encode([
                'status' => 'ok',
                'return' => true,
                'data' => $data,
                'message' => 'Usuário com a conta '.$account.' foi encontrado',
            ]);
        } else {
            return json_encode([
                'status' => 'fail',
                'return' => false,
                'erros' => $erros,
                'message' => 'Usuário com a conta '.$account.' NÃO foi encontrado',
            ]);
        }
    }
}

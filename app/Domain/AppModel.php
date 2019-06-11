<?php
/**
 * Classe que contem todas as regras de modelo da aplicação.
 */
namespace App\Domain;

use \Kernel\Model;
use \App\Helpers\Request;
use \App\Helpers\Session;


class AppModel extends \Kernel\Model {


      // Regras Sistemas PMM

    public static function getUserSys($id)
    {
        return self::query("SELECT distinct

                            SISTEMA.TX_SISTEMA

                            from SEMAD.V_PERFIL_USUARIO,
                                 SISTEMA

                            WHERE SISTEMA.ID_SISTEMA = V_PERFIL_USUARIO.ID_SISTEMA

                            AND V_PERFIL_USUARIO.ID_SISTEMA IN (SELECT ID_SISTEMA
                                FROM SEMAD.V_PERFIL_USUARIO
                                WHERE ID_USUARIO    = '$id'
                            )

                            ORDER BY SISTEMA.TX_SISTEMA");
    }

    /**
     * Método que retorna todos os dados essenciais do usuário que logar.
     *
     * @method getUserIndo
     *
     * @param string
     *
     * @return array
     */
    public static function getUserInfo($username)
    {
        return self::query("SELECT
                    US.ID_USUARIO,
                    US.ID_PESSOA_FUNCIONARIO,
                    US.TX_LOGIN,
                    PE.TX_NOME NOME,
                    FU.ID_UNIDADE_GESTORA,
                    UO.TX_UNIDADE_ORG,
                    UO.TX_SIGLA_UNIDADE,
                    US.TX_EMAIL_PMM

                    FROM SEMAD.USUARIO US,
                    SEMAD.FUNCIONARIO_2 FU,
                    SEMAD.PESSOA PE,
                    SEMAD.UNIDADE_ORG UO

                    WHERE UO.ID_UNIDADE_ORG        = FU.ID_UNIDADE_GESTORA
                    AND FU.ID_PESSOA_FUNCIONARIO   = US.ID_PESSOA_FUNCIONARIO
                    AND PE.ID_PESSOA               = US.ID_PESSOA_FUNCIONARIO
                    AND FU.CS_SITUACAO_FUNCIONARIO = 1
                    AND UPPER(US.TX_LOGIN) LIKE UPPER('{$username}')");
    }

    /**
     * Método que retorna informações do programa acessado.
     *
     * @method getProgramInfo
     *
     * @param string
     *
     * @return array
     */
    public static function getProgramInfo($program)
    {
        return self::query("SELECT
                                ID_SISTEMA,
                                NB_MODULO,
                                NB_PROGRAMA

                                FROM PROGRAMA

                                WHERE TX_URL = '{$program}'");
    }

    /**
     * Método que retorna permissão de acesso do usuário no programa que esta acessando.
     *
     * @method getUserAccess
     *
     * @param array
     *
     * @return bool
     */
    public static function getUserAccess($data)
    {
        extract($data[0]);

        $data = self::query("SELECT

                                CS_NIVEL_ACESSO

                             FROM V_PERFIL_USUARIO

                             WHERE ID_SISTEMA  = '{$ID_SISTEMA}'
                             AND   NB_MODULO   = '{$NB_MODULO}'
                             AND   NB_PROGRAMA = '{$NB_PROGRAMA}'
                             AND   ID_USUARIO  = '".Session::get('ID_USUARIO')."'");

        if ($data) {
            switch ($data[0]['CS_NIVEL_ACESSO']) {
                // Nivel de pesquisa
                case 0:
                    Session::set('s_token_access', false);
                break;

                // Nivel completo
                case 1:
                    Session::set('s_token_access', Session::get('s_token').md5(Session::get('ID_USUARIO')));
                break;
            }

            return true;
        }

        // Acesso negado.
        return false;
    }

     /**
      * Método que retorna a chave de uma tabela.
      *
      * @method fgpk
      *
      * @param string
      * @param array
      *
      * @return string
      */
     public static function fgpk($table, $args = [])
     {
         $args = ($args) ? '('.implode(',', $args).')' : false;

         $data = self::query("SELECT semad.F_G_PK_{$table}$args AS CODIGO FROM DUAL");

         if ($data) {
             return $data[0]['CODIGO'];
         }
     }

      /**
       * Método que retorna a chave de uma tabela.
       *
       * @method fgcode
       *
       * @param string
       * @param array
       *
       * @return string
       */
      public static function fgcode($table, $args = [])
      {
          $args = ($args) ? '('.implode(',', $args).')' : false;

          $data = self::query("SELECT semad.{$table}$args AS CODIGO FROM DUAL");

          if ($data) {
              return $data[0]['CODIGO'];
          }
      }

     // GERADOR DE CÓDIGO THUPAN - REGRAS SISTEMASPMM

     /**
      * Gerador de Código.
      *
      * Métodos que seguem as regras de negócio dos sistemas pmm
      * para geração de programas de um sistema.
      *
      * http://server/thupan-generator
      */
     public static function getSistemas()
     {
         Request::any($data);

         if (!is_null($data)) {
             extract($data);
             $columns = Model::getColumnsKey(['SISTEMA.TX_SISTEMA'], $query_select2);
         }

         return self::query("SELECT
                                SISTEMA.ID_SISTEMA ID,
                                SISTEMA.TX_SISTEMA TEXT

                             FROM
                                SISTEMA

                             WHERE 1=1

                             $columns

                             ORDER BY SISTEMA.TX_SISTEMA", 'json');
     }

    public static function getModulos()
    {
        Request::any($data);

        if (!is_null($data)) {
            extract($data);
            $columns = Model::getColumnsKey(['MODULO.TX_MODULO'], $query_select2);
        }

        return self::query("SELECT
                                MODULO.NB_MODULO ID,
                                MODULO.TX_MODULO TEXT

                             FROM
                                MODULO

                             WHERE MODULO.ID_SISTEMA = '{$ID_SISTEMA}'

                             $columns

                             ORDER BY MODULO.TX_MODULO", 'json');
    }

    public static function getProgramas()
    {
        Request::any($data);

        if (!is_null($data)) {
            extract($data);
            $columns = Model::getColumnsKey(['PROGRAMA.NB_PROGRAMA'], $query_select2);
        }

        return self::query("SELECT
                                PROGRAMA.NB_PROGRAMA ID,
                                PROGRAMA.TX_PROGRAMA TEXT

                             FROM
                                SISTEMA

                             INNER JOIN MODULO
                             ON SISTEMA.ID_SISTEMA = MODULO.ID_SISTEMA

                             INNER JOIN PROGRAMA
                             ON MODULO.ID_SISTEMA = PROGRAMA.ID_SISTEMA
                             AND MODULO.NB_MODULO = PROGRAMA.NB_MODULO

                             WHERE SISTEMA.ID_SISTEMA = '{$ID_SISTEMA}'
                             AND MODULO.NB_MODULO = '{$NB_MODULO}'

                             $columns

                             ORDER BY PROGRAMA.TX_PROGRAMA", 'json');
    }

    public static function getUrl()
    {
        Request::any($data);

        if (!is_null($data)) {
            extract($data);
        }

        return self::query("SELECT
                                TX_URL
                             FROM
                                SISTEMA
                             INNER JOIN MODULO
                             ON SISTEMA.ID_SISTEMA      = MODULO.ID_SISTEMA

                             INNER JOIN PROGRAMA
                             ON MODULO.ID_SISTEMA       = PROGRAMA.ID_SISTEMA
                             AND MODULO.NB_MODULO       = PROGRAMA.NB_MODULO

                             WHERE SISTEMA.ID_SISTEMA   = '{$ID_SISTEMA}'
                             AND   MODULO.NB_MODULO     = '{$NB_MODULO}'
                             AND   PROGRAMA.NB_PROGRAMA = '{$NB_PROGRAMA}'", 'json');
    }

    public static function getTabelas()
    {
        Request::any($data);

        $c = autoload_config();
        foreach ($c['database']['connections'][Session::get('s_environment')] as $index => $array) {
            if ($array['connection'] == DB_DEFAULT_CONN) {
                $database = $array['database'];
            }
        }

        if (GENERATOR_DEFAULT_DB_DRIVER === 'oci') {
            if (!is_null($data)) {
                extract($data);
                $columns = Model::getColumnsKey(['OBJECT_NAME'], $query_select2);
            }

            $OWNER = ($OWNER) ? $OWNER : 'SEMAD';

            return self::query("SELECT OBJECT_NAME ID, OBJECT_NAME TEXT
                                    FROM ALL_OBJECTS
                                    WHERE (OBJECT_TYPE = 'TABLE'
                                    OR OBJECT_TYPE = 'VIEW')
                                    AND OWNER ='{$OWNER}'

                                 $columns

                                 ORDER BY OBJECT_NAME", 'json');
        } elseif (GENERATOR_DEFAULT_DB_DRIVER === 'mysql') {
            if (!is_null($data)) {
                extract($data);
                $columns = Model::getColumnsKey(['TABLE_NAME'], $query_select2);
            }

            return self::query("select TABLE_NAME AS ID, TABLE_NAME AS TEXT
    		                    from information_schema.TABLES where TABLE_SCHEMA = '$database' $columns order by TABLE_NAME", 'json');
        }
    }

    public static function getCampos()
    {
        //  Request::any($data);

         if (!is_null($_REQUEST)) {
             extract($_REQUEST);
         }

        $c = autoload_config();

        foreach ($c['database']['connections'][Session::get('s_environment')] as $index => $array) {
            if ($array['connection'] == DB_DEFAULT_CONN) {
                $database = $array['database'];
            }
        }

        if (GENERATOR_DEFAULT_DB_DRIVER === 'oci') {
            $OWNER = ($OWNER) ? $OWNER : 'SEMAD';

            foreach ($TABLE_NAME as $key => $val) {
                $TABLE_NAME = $val;

                $fetch = self::query("SELECT COLUMN_NAME
                             FROM ALL_TAB_COLUMNS
                             WHERE TABLE_NAME = '{$TABLE_NAME}'
                             AND OWNER = '{$OWNER}'
                             ORDER BY COLUMN_NAME");
                $data[] = $fetch;
            }
        } elseif (GENERATOR_DEFAULT_DB_DRIVER === 'mysql') {
            foreach ($TABLE_NAME as $key => $val) {
                $TABLE_NAME = $val;

                $fetch = self::query("SELECT COLUMN_NAME
                                      FROM INFORMATION_SCHEMA.COLUMNS
                                      WHERE table_name = '{$TABLE_NAME}'
                                      AND table_schema = '$database' order by column_name");
                $data[] = $fetch;
            }
        }

        return json_encode($data);
    }

     // metodos para montar o menu dinamicamente.
     public static function getSistema($sistema)
     {
         return self::query("select ID_SISTEMA from SISTEMA where TX_SISTEMA = '$sistema'")[0]['ID_SISTEMA'];
     }

    public static function getModulo($id_sistema)
    {
        return self::query("select NB_MODULO,TX_MODULO from MODULO where ID_SISTEMA = '$id_sistema'  AND (MODULO.CS_ATIVO_MENU <> 2 OR MODULO.CS_ATIVO_MENU IS NULL)");
    }

    public static function getPrograma($id_sistema, $id_modulo)
    {
        if (GENERATOR_DEFAULT_DB_DRIVER === 'oci') {
            $orderby = "to_number(regexp_substr(TX_PROGRAMA,'^[0-9]+'))";
        } elseif (GENERATOR_DEFAULT_DB_DRIVER === 'mysql') {
            $orderby = 'TX_PROGRAMA';
        }

        return self::query("select distinct PROGRAMA.NB_PROGRAMA,TX_PROGRAMA,TX_URL,PROGRAMA.CS_ATIVO_MENU,PROGRAMA.ID_PROGRAMA_PAI from PROGRAMA, MODULO where PROGRAMA.ID_SISTEMA = '$id_sistema' AND MODULO.NB_MODULO = '$id_modulo' AND PROGRAMA.NB_MODULO = MODULO.NB_MODULO AND (PROGRAMA.CS_ATIVO_MENU <> 2 OR PROGRAMA.CS_ATIVO_MENU IS NULL) AND PROGRAMA.ID_PROGRAMA_PAI IS NULL ORDER BY $orderby");
    }

    public static function getProgramaFilho($id_sistema, $id_modulo, $id_programa_pai)
    {
        return self::query("select PROGRAMA.NB_PROGRAMA,TX_PROGRAMA,TX_URL,PROGRAMA.CS_ATIVO_MENU,PROGRAMA.ID_PROGRAMA_PAI from programa where id_sistema = '$id_sistema' and nb_modulo = '$id_modulo' and id_programa_pai = '$id_programa_pai'");
    }

    public static function getMenuSearch($sistema, $pesquisa)
    {
        $sistema_codigo = self::query("SELECT ID_SISTEMA ID FROM SISTEMA WHERE TX_SISTEMA = '{$sistema}'")[0]['ID'];

        $resultado = self::query("SELECT DISTINCT
            UPPER(TX_PROGRAMA) TX_PROGRAMA,
            LOWER(TX_URL) TX_URL
                                            FROM PROGRAMA,
                                              MODULO
                                            WHERE PROGRAMA.ID_SISTEMA = '$sistema_codigo'
                                            AND PROGRAMA.NB_MODULO    = MODULO.NB_MODULO
                                            AND UPPER(TX_PROGRAMA) LIKE '%$pesquisa%'
                                            AND (PROGRAMA.CS_ATIVO_MENU <> 2 OR PROGRAMA.CS_ATIVO_MENU IS NULL)
                                            ORDER BY UPPER(TX_PROGRAMA)");
    }

    public static function getUserId(){
        return self::query("SELECT ID_USUARIO FROM USUARIO WHERE TX_LOGIN = USER")[0]['ID_USUARIO'];
    }
}

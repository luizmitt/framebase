<?php

namespace App\Helpers;

use \Service\Html as HtmlService;

class Html extends HtmlService {


    /**
     * Método público Button dropdowns.
     *
     * @method buttonDropdowns()
     * @param String
     * @param Array
     * @param Array
     */
    public static function buttonDropdowns($label = 'Button', $itens=[], $options = [])
    {
        $options['class'] = 'btn-group';
        foreach($itens as $i=>$v)
        {
            if(is_array($v)){
                $li .= self::tag('li',self::a($i,$v[0],$v[1]),[]);
            }else{
                $li .= self::tag('li',self::a($i,$v,[]),[]);
            }   
        }
        $html = self::beginTag('div', $options);
        $html .= self::button($label.' '.self::tag('span','',['class'=>'caret']),['class'=>"btn btn-default dropdown-toggle", 'data-toggle'=>"dropdown", 'aria-haspopup'=>"true", 'aria-expanded'=>"false"]);
        $html .= self::tag('ul',$li,['class'=>"dropdown-menu"]);
        $html .= self::endTag('div');
        return $html;
    }

}
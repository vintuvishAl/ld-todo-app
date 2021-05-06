<?php

namespace App\Utils; // Your helpers namespace 

use Exception;
use Image;

use function PHPUnit\Framework\throwException;

class Utils{

    const file_uploaded = 1;
    const internal_error = 10;
    const file_not_provided = 13;
    const HTTP_bad_request_400 = 400;

    const picture = 'picture';

    const picture_path = 'todoImages';
    const helper_path = 'app/todoImages/';
    const thumbnail_path = 'thumbnail/';
    const thumbnail = 'thumbnail_';

    public static function mkdir_if_not_existed($path){
        if(!file_exists($path)) {
            mkdir($path, 0666, true);
        }
    }
    
    public static function save_picture($req, &$res){
        try{
            if($req->hasFile(self::picture)){
                $path_original = $req->file(self::picture)->store(self::picture_path);
                $uploaded_img_name = self::thumbnail.substr($path_original, 11);
                $path_storage = storage_path(self::helper_path);
                $path_thumbnail = $path_storage.self::thumbnail_path;
                self::mkdir_if_not_existed($path_thumbnail);
                $img = Image::make($req->file(self::picture));
                $img->resize(24, 24)->save($path_thumbnail.$uploaded_img_name);
                $res['upload'] = true;
                $res['reason'] = self::file_uploaded;
                $res['picture'] = array ("picture" => $path_original,
                                "thumbnail" => self::picture_path.'/'.self::thumbnail_path.$uploaded_img_name);
            }else{
                $res['upload'] = true;
                $res['picture'] = array("picture"=> "storage/default.png", "thumbnail"=> "storage/default.png");
            }
        } catch(Exception $e){
            $re['upload'] = false;
            $res['reason'] = self::internal_error;
            $res['picture'] = array("picture"=> "null", "reason" => "is ".self::internal_error." ".$e->getMessage());
        } 
    }

    public static function validate_request($validate, &$req){
        $valid = true;
        foreach( $validate as $value => $type){

            if($value == "picture" && is_array($type)){
                if($req->hasFile($value)){
                    if(!in_array($req->$value->extension(), $type)){
                        $valid = false;
                        break;
                    }
                }else{
                    $valid = false;
                    break;
                }
            }else{
                if(!$req->has($value)){
                    $valid=false;
                    break;
                }else{
                    if(is_numeric($req->$value)){
                        if($type != "integer"){
                            $valid=gettype($req->$value);
                            break;
                        }
                    }else{
                        if(gettype($req->$value) != $type){
                            $valid=false;
                            break;
                        }
                    }
                   
                }
            }
        }
        return $valid;
    }


}

?>

<?php

namespace App\Http\Controllers;
use App\Models\Todolist;
use App\Models\User;
use App\Utils\Utils;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;
use Image;

class TodoListController extends Controller
{
    const HTTP_SUCCESS_200 = 200;
    const HTTP_created_201 = 201;
    const HTTP_no_content_204 = 204;
    const HTTP_bad_request_400 = 400;
    const HTTP_not_found_404 = 404;
    const HTTP_internal_error_500 = 500;
    const ERROR_MESSAGE = array("error"=>"Internal server error");
    const SUCCESS_MESSAGE = array("Sucess" => true);
    
    public function get_todo_item(Request $request){
        $limit = $request->limit ? $request->limit : 8;
        if($request->route()->named('completed'))
            $completed = true; 
        if($request->route()->named('pending'))
            $completed = false; 
        if(isset($completed))
            $todo_list = TodoList::where('completed',$completed)->orderBy('index','desc')->paginate($limit);
        else
            $todo_list = TodoList::orderBy('index','desc')->paginate($limit);
        if($todo_list)
            return response($todo_list, self::HTTP_SUCCESS_200);
        else    
            return response(self::ERROR_MESSAGE,self::HTTP_not_found_404);
    }

    public function create_todo_item(Request $request){
        $validation = array("name" => "string");
        $validate = Utils::validate_request($validation, $request);
        if(!$validate)
            return response(self::ERROR_MESSAGE,self::HTTP_bad_request_400);
        $error = array("Error" => 11);   
        $res = array("upload"=>false);
        Utils::save_picture($request, $res);
        $count = TodoList::count();
        $item = new TodoList;
        $item->name = $request["name"];
        $item->completed = false;
        $item->index = $count;
        $item->picture = $res["picture"];
        if($item->save())
            return response($item, self::HTTP_created_201);
        else    
            return response($error, self::HTTP_internal_error_500);

    }

    public function delete_todo_item($id){ 
        $task = TodoList::find($id);
        if($task)
            if($task->delete())
                return response(self::SUCCESS_MESSAGE,self::HTTP_no_content_204);
            else
                return response(self::ERROR_MESSAGE,self::HTTP_not_found_404);
        else  
            return response(self::ERROR_MESSAGE,self::HTTP_internal_error_500); 
        
    }

    public function update_todo_item(Request $request, $id){
        $res = array("upload"=>false);
        $error = array("Error" => 11);
        if(!$request)
            return response(self::ERROR_MESSAGE,self::HTTP_bad_request_400);
        $item = TodoList::find($id);
        if(!$item)
            return response(self::ERROR_MESSAGE, self::HTTP_not_found_404);
        if($request->name)
            $item->name = $request->name;
        if($request->completed)
            $item->completed = $request->completed;
        if($request->hasFile('picture')){
            Utils::save_picture($request, $res);
            $item->picture = $res['picture'];
        } 
        if($item->save())
            return response($item, self::HTTP_SUCCESS_200); 
        else
            return response(self::ERROR_MESSAGE,self::HTTP_internal_error_500);
    }

    public function reorder_todo_items(Request $request,$id){    
        $validation = array("index" => "integer");
        $validate = Utils::validate_request($validation,$request);
        if(!$validate)
            return response(self::ERROR_MESSAGE,self::HTTP_bad_request_400);
        $item = Todolist::find($id);
        $count = Todolist::count();
        if($request->index>$count)
            return response(self::ERROR_MESSAGE,self::HTTP_bad_request_400);

        if(!$item)
            return response(self::ERROR_MESSAGE,self::HTTP_not_found_404);
        $current_index = $item->index; 
        $new_index = $request->index;
        if($current_index>$new_index){
            $range = [$new_index, $current_index];
            $operator = 1;
        }
        else{
            $range = [$current_index, $new_index];
            $operator = -1;
        }
        $tasks = TodoList::select('id','index')->whereBetween('index',$range)->orderBy('index')->get();
        foreach($tasks as $task){
            if($task->index == $current_index)    
                $task->index = $new_index;
            else
                $task->index += $operator;
            $task->save();
        }

        return response(self::SUCCESS_MESSAGE,self::HTTP_SUCCESS_200);
    }


    public function test_api(Request $req){
        $result = "result ";
        if($req->has('name') && gettype($req->name) == "string")
            $result = $result."name passed value: ".$req->name;
        else
            $result = $result."name failed";
            
       
        return response("hellooo",200);
        $items = TodoList::where('index','=',0)->get(); 
        return $items;
        foreach($items as $item){
            $item->index -=1;
            $item->save();
        }
    }

    public function download_image(Request $req){
        try{
            if($req->picture){
                $picture = Storage::download($req->picture);
                return response($picture,self::HTTP_SUCCESS_200);
            }else{
                return response(self::ERROR_MESSAGE,self::HTTP_bad_request_400);
            }     
        }catch(Exception $e){
            return response(self::ERROR_MESSAGE,self::HTTP_internal_error_500);
        }

    }
}


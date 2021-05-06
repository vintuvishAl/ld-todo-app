<?php

use App\Http\Controllers\TodoListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/todo', [TodoListController::class, 'get_todo_item']);
Route::get('/todo/completed', [TodoListController::class, 'get_todo_item'])->name('completed');
Route::get('/todo/pending', [TodoListController::class, 'get_todo_item'])->name('pending');
Route::post('/todo', [TodoListController::class, 'create_todo_item']);
Route::delete('/todo/{id}', [TodoListController::class, 'delete_todo_item'])->whereNumber('id');
Route::patch('/todo/{id}', [TodoListController::class, 'update_todo_item'])->whereNumber('id');
Route::patch('/todo/reorder/{id}', [TodoListController::class, 'reorder_todo_items'])->whereNumber('id');
Route::get('/todo/picture/', [TodoListController::class, 'download_image']);
Route::post('/todo/test', [TodoListController::class, 'test_api']);

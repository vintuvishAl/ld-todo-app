<?php

namespace App\Observers;

use App\Models\TodoList;

class TodoListObserver
{
    /**
     * Handle the TodoList "created" event.
     *
     * @param  \App\Models\TodoList  $todoList
     * @return void
     */
    public function created(TodoList $todoList)
    {
        //
    }

    /**
     * Handle the TodoList "updated" event.
     *
     * @param  \App\Models\TodoList  $todoList
     * @return void
     */
    public function updated(TodoList $todoList)
    {
        //
    }

    /**
     * Handle the TodoList "deleted" event.
     *
     * @param  \App\Models\TodoList  $todoList
     * @return void
     */
    public function deleted(TodoList $todoList)
    {
        //
        if($todoList){
            $items = Todolist::where('index','>',$todoList->index)->get(); 
            foreach($items as $item){
                $item->index -=1;
                $item->save();
            }
        }
    }

    /**
     * Handle the TodoList "restored" event.
     *
     * @param  \App\Models\TodoList  $todoList
     * @return void
     */
    public function restored(TodoList $todoList)
    {
        //
    }

    /**
     * Handle the TodoList "force deleted" event.
     *
     * @param  \App\Models\TodoList  $todoList
     * @return void
     */
    public function forceDeleted(TodoList $todoList)
    {
        //
    }
}

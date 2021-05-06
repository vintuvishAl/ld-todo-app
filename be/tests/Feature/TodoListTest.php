<?php

namespace Tests\Feature;

use App\Models\TodoList;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class TodoListTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    /** @test */ 
    public function post_to_the_todolist_table_check()
    {

        $name = $this->faker->sentence();
        $file = UploadedFile::fake()->image('avatar.jpg');
        $attributes = [
            'name' => $name,
            'picture' => $file,
        ];
        $response = $this->post('/api/todo',$attributes);
        $response->assertStatus(Response::HTTP_CREATED)
                ->assertJsonStructure(['name','completed','picture']);
        
    }

    /** @test */ 
    public function get_todolist_all()
    {

        $response = $this->get('/api/todo');
        $response->assertStatus(Response::HTTP_OK)
                 ->assertJsonStructure(['current_page','data','first_page_url','last_page_url']);
        
    }

    /** @test */ 
    public function get_todolist_completed()
    {

        $response = $this->get('/api/todo/completed');
        $response->assertStatus(Response::HTTP_OK)
                 ->assertJsonStructure(['current_page','data','first_page_url','last_page_url']);
        
    }

     /** @test */ 
     public function get_todolist_pending()
     {
 
         $response = $this->get('/api/todo/pending');
         $response->assertStatus(Response::HTTP_OK)
                  ->assertJsonStructure(['current_page','data','first_page_url','last_page_url']);
         
     }

      /** @test */ 
      public function delete_todolist_item()
      { 
          $item = new TodoList;
          $item->name = $this->faker->sentence();
          $item->picture = array("picture"=>"test");
          $item->index = TodoList::count();
          $item->save();
          $response = $this->delete('/api/todo/'.$item->id);
          $response->assertStatus(Response::HTTP_NO_CONTENT);
      }

       /** @test */ 
       public function edit_todolist_item()
       { 
            $name = $this->faker->sentence();
            $file = UploadedFile::fake()->image('avatar.jpg');
            $completed = $this->faker->boolean();
            $attributes = [
                'name' => $name,
                'picture' => $file,
                'completed' => $completed,
            ];
            $item = new TodoList;
            $item->name = $this->faker->sentence();
            $item->picture = array("picture"=>"test");
            $item->index = TodoList::count();
            $item->save();
            $response = $this->post('/api/todo/'.$item->id.'?_method=patch', $attributes);
            $response->assertStatus(Response::HTTP_OK);
       }


}

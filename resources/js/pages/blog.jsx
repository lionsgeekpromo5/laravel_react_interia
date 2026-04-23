import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

function Blog() {


    const { user, blogs } = usePage().props;
    console.log(blogs);
    

    const {data, setData, post, errors, reset, processing} = useForm({
        'title': '',
        'paragraph': ''
    })

    const submit = (e) => {
        e.preventDefault()
        post('/blog/store')
        reset('title', 'paragraph')
        console.log(data);
        
    }




    return (
        <div>
      <form
        onSubmit={submit}
        className="bg-white shadow-lg rounded-xl p-6 w-full border flex items-center gap-x-2 "
      >
        <h2 className="text-xl font-semibold">Create Post</h2>

        {/* Title */}
        <div className="flex items-center gap-x-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter title..."
            required
            onChange={(e) => setData('title', e.target.value)}
            value={data.title}
            className=" rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Paragraph */}
        <div className="flex items-center gap-x-2">
          <label className="block text-sm font-medium text-gray-700">
            Paragraph
          </label>
          <textarea
            name="paragraph"
            placeholder="Write your content..."
            required
            value={data.paragraph}
            onChange={(e) => setData('paragraph', e.target.value)}
            className=" rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className=" bg-blue-600 text-white py-1.5 px-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
            {processing ? 'saving .....' : 'submit'}
        </button>
      </form>
      {/* articles */}


        <div class="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
    <div class="text-center mb-10">
        <h2 class="text-4xl tracking-tight font-bold text-primary-800">Highlighted Features</h2>
    </div>

    <div class="flex flex-col md:flex-row">


        <div class="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
            {
                blogs?.map((blog) => (
            <div class="w-full sm:w-1/2 mb-4 px-2 ">
                <div class="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
                    <h3 class="text-2xl font-bold text-md mb-3">{blog.title}</h3>
                    <h3 class="text-sm font-bold text-md text-blue-800 ">{blog.user.name}</h3>
                    <p class="text-sm">{blog.paragraph}</p>
                </div>
            </div>                ))
            }




        </div>
    </div>
</div>
    </div>
            
    );
}

export default Blog;

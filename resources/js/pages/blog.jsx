import { router, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import React, { useState } from 'react';

function Blog() {
    const { user, blogs } = usePage().props;
    const [onUpdate, setOnupdate] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    console.log(selectedBlog);
    
    const { data, setData, post, errors, reset, processing, put } = useForm({
        title: '',
        paragraph: '',
    });

    console.log(data);

    const submit = (e) => {
        e.preventDefault();
        post('/blog/store');
        reset('title', 'paragraph');
        console.log(data);
    };

    const updateBlog = (e) => {
        e.preventDefault()

        put(`/blog/update/${selectedBlog?.id}`)
        reset('title', 'paragraph')


    }

    return (
        <div>
            {/* Add Blog */}
            <Dialog>
                <DialogTrigger>
                    <Button>Add Blog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Add your blog here</DialogTitle>

                    <form
                        onSubmit={submit}
                        className="flex w-full flex-col gap-x-2 gap-y-2 rounded-xl border bg-white p-2 shadow-lg"
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
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                value={data.title}
                                className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                onChange={(e) =>
                                    setData('paragraph', e.target.value)
                                }
                                className="resize-none rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-2 py-1.5 text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'saving .....' : 'submit'}
                        </button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* update Modal */}

            <Dialog open={onUpdate} onOpenChange={setOnupdate}>
                <DialogTrigger>
                    <Button>Update Blog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Update your blog here</DialogTitle>

                    <form
                        
                        className="flex w-full flex-col gap-x-2 gap-y-2 rounded-xl border bg-white p-2 shadow-lg"
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
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                value={
                                    data.title
                                        ? data.title
                                        : selectedBlog?.title
                                }
                                className="rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                value={
                                    data.paragraph
                                        ? data.paragraph
                                        : selectedBlog?.paragraph
                                }
                                onChange={(e) =>
                                    setData('paragraph', e.target.value)
                                }
                                className="resize-none rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            onClick={updateBlog}
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-2 py-1.5 text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'saving .....' : 'submit'}
                        </button>
                    </form>
                    <DialogFooter>
                        <button
                            className="rounded-md bg-red-400 px-2 py-1.5"
                            onClick={() => {
                                setSelectedBlog(null);
                                setOnupdate(false);
                                reset();
                            }}
                        >
                            Close
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* articles */}

            <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div class="mb-10 text-center">
                    <h2 class="text-primary-800 text-4xl font-bold tracking-tight">
                        Highlighted Features
                    </h2>
                </div>

                <div class="flex flex-col md:flex-row">
                    <div class="-mx-2 -mb-4 flex flex-1 flex-col flex-wrap sm:flex-row">
                        {blogs?.map((blog) => (
                            <div class="mb-4 w-full px-2 sm:w-1/2">
                                <div class="h-full rounded-br-xl border border-t-0 border-l-0 border-green-500 px-6 py-4">
                                    <h3 class="text-md mb-3 text-2xl font-bold">
                                        {blog.title}
                                    </h3>
                                    <h3 class="text-md text-sm font-bold text-blue-800">
                                        {blog.user.name}
                                    </h3>
                                    <p class="text-sm">{blog.paragraph}</p>
                                    <button
                                        className="font-bold text-blue-300"
                                        onClick={() => {
                                            setOnupdate(true);
                                            setSelectedBlog(blog);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;

import CreatePostForm from './create-post-form';

export default function CreatePostPage() {
  return (
    <div className="container max-w-4xl py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Create a New Post
        </h1>
        <p className="mt-3 text-muted-foreground">
          Fill out the form below or use our AI to generate a title and description.
        </p>
      </div>
      <CreatePostForm />
    </div>
  );
}

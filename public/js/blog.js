document.querySelector('#new-post-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the dashboard after successful post
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
});

<script>
import Navbar from '../../Navbar.svelte'
import Footer from '../../Footer.svelte'

export let data
console.log(data)
</script>

<svelte:head>
  <title>Team - Enoho Fikir</title>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css">
</svelte:head>

<div id="app">
  <Navbar />

  <div id="story">
    <a href="/news"><i class="mi mi-arrow-left"></i>Back to <i>News & Updates</i></a>
    <img src="http://localhost:1337{data.thumbnail.data.attributes.url}" />
    <h1>{ data.title }</h1>
    <p>{ data.content }</p>

    <Footer />
  </div>
</div>

<style>
#story {
  margin-top: 100px;
}

img {
  display: block;
  width: 50vw;
  margin: 30px auto 0;
}

a {
  margin: 0 25vw;
  color: #697b8c;
  text-decoration: none; 
}

h1 {
  width: 50vw;
  text-align: center;
  margin: 20px auto 50px;
}

p {
  width: 45vw;
  margin: 0 auto;
  font-size: 20px;
  line-height: 32px;
  padding-bottom: 100px;
  font-family: source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;
}

@media (max-width: 900px) {
  h1, p {
    width: 70vw;
  }
}
</style>
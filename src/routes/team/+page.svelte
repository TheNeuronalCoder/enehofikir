<script>
import { onMount } from 'svelte'

import Navbar from '../Navbar.svelte'
import Footer from '../Footer.svelte'

let team = []

onMount(async () => {
  fetch('http://170.187.137.154:1337/api/teams?populate=*')
  .then(res => res.json())
  .then(json => team = json.data.map(item => item.attributes))
  .catch(_ => console.error('500 Server Error'))
})
</script>

<svelte:head>
  <title>Team - Enoho Fikir</title>
</svelte:head>

<div id="app">
  <Navbar />

  <div id="team">
    <h1>Meet Our Team</h1>

    <div id="team-list">
      {#each team as member}
        <div class="member-card">
          <img width="300" height="200"
               src="http://170.187.137.154:1337{member.photo.data.attributes.url}"
               alt={member.name} />
          <h3>{ member.name }</h3>
          <span>{ member.email }</span>
        </div>
      {/each}
    </div>

    <Footer />
  </div>
</div>

<style>
#team {
  margin-top: 64px;
}

#team h1 {
  text-align: center;
  margin: 120px 0 50px;
}

#team-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 0 100px 100px;
  justify-content: space-between;
}

.member-card {
  width: 300px;
  overflow: hidden;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 20px;
  padding-bottom: 18px;
  border: 1px solid #f0f0f0;
}

.member-card:hover {
  border: none;
  transition: ease .3s;
  box-shadow: 0 2px 8px #999;
}

.member-card img {
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
              linear-gradient(#f5f6f7, #f5f6f7);  
  background-repeat: no-repeat;
  background-size: 300px 200px, 300px 144px, 95.2380952 80px, 214.285714px 24px;
  background-position: -300px 0, 0 0, 0 152px, 47.6190476px 156px;  
  animation: loading 1.5s infinite;
}

@keyframes loading {
  to { background-position: 300px 0, 0 0, 0 152px, 47.6190476px 156px; }
}
</style>
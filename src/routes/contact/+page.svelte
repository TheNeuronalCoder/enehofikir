<script>
import { onMount } from 'svelte'

import Navbar from '../Navbar.svelte'
import Footer from '../Footer.svelte'

let contacts = {
  phone: '',
  email: '',
  address: ''
}

onMount(async () => {
  fetch('http://localhost:1337/api/contact')
  .then(res => res.json())
  .then(json => {
		contacts = json.data.attributes
  }).catch(error => {
    contacts = {
      phone: '505 Server Error',
      email: '505 Server Error',
      address: '505 Server Error'
    }
  })
})
</script>

<svelte:head>
  <title>Contact Us</title>
</svelte:head>

<div id="app">
  <Navbar />

  <div id="contact">
    <h1>Contact us anytime</h1>

    <div id="contact-info">
      <div class="info-card">
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M23.71 26.3l-1.63-1.63c5.33-5.33 5.33-14 0-19.34L23.7 3.7a16 16 0 010 22.6zM20.89 6.52l-1.63 1.63a9.7 9.7 0 010 13.7l1.63 1.63a12 12 0 000-16.96zm-2.91 2.91l-1.64 1.64a5.57 5.57 0 010 7.87l1.64 1.63a7.89 7.89 0 000-11.14zM1.94 8.45c-.17 2.12-.27 4.25-.31 6.38h-.01v.34h.01c.04 2.13.14 4.26.3 6.38.45 5.56 4.82 9.26 9.1 8.3.2-.04.4-.04.57-.11 1.04-.44 1.9-1.24 2.87-1.84 1.23-.77-1.42-7.3-3.06-6.46-.6.32-2.28 1.56-2.95 1.65-.6.08-1.08-.71-1.14-1.45-.15-1.93-.01-4.41 0-6.47V15v-.17c-.01-2.06-.15-4.53 0-6.47.06-.74.53-1.53 1.13-1.45.68.1 2.35 1.33 2.96 1.65 1.64.84 4.28-5.69 3.06-6.46C13.5 1.5 12.64.7 11.6.27c-.18-.08-.38-.08-.56-.12-4.29-.96-8.66 2.74-9.1 8.3z"/></svg>
        <h2>Phone</h2>
        {#each contacts.phone.split('\n') as number}
          <p>{number}</p>
        {/each}
      </div>

      <div class="info-card">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M469 64H43C19 64 0 83 0 107v298c0 24 19 43 43 43h426c24 0 43-19 43-43V107c0-24-19-43-43-43zM43 85h426l5 1-203 185c-3 3-8 6-15 6s-12-3-15-6L38 86l5-1zM21 405V107l2-6 169 154C136 303 51 384 22 411l-1-6zm448 22H43l-5-1c29-28 115-110 170-156l18 17c9 7 19 12 30 12s21-5 30-12l18-17c55 46 141 128 170 156l-5 1zm22-22l-1 6c-29-27-114-108-170-156l169-154 2 6v298z"/></svg>
        <h2>Email</h2>
        {#each contacts.email.split('\n') as email}
          <p>{email}</p>
        {/each}
      </div>

      <div class="info-card">
        <svg viewBox="0 0 640 1024" xmlns="http://www.w3.org/2000/svg"><path d="M320 0c-177 0-320 143-320 320s160 416 320 704c160-288 320-527 320-704s-143-320-320-320z m0 448c-71 0-128-57-128-128s57-128 128-128 128 57 128 128-57 128-128 128z" /></svg>
        <h2>Address</h2>
        {#each contacts.address.split('\n') as address}
          <p>{address}</p>
        {/each}
      </div>
    </div>

    <div class="spacer"></div>

    <Footer />
  </div>
</div>

<style>
#contact {
  display: flex;
  margin-top: 100px;
  flex-direction: column;
}

.spacer {
  width: 100vw;
  flex-basis: max-content;
}

h1 {
  text-align: center;
  margin: 50px 0 100px;
}

#contact-info {
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.info-card {
  display: flex;
  width: 300px;
  margin: 0 10px 100px;
  align-items: center;
  padding-bottom: 20px;
  flex-direction: column;
  background-color: #f3f5f4;
}

.info-card svg {
  width: 100px;
  height: 100px;
  margin: -50px 0 10px;
}

.info-card p {
  margin: 10px 0;
}
</style>
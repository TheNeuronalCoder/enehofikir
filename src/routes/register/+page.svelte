<script>
import Navbar from '../Navbar.svelte'
// import Footer from '../Footer.svelte'
import emailjs from '@emailjs/browser'
import country_codes from './country_codes'

let name = ''
let gender = ''
let birth_date = ''
let birth_month = ''
let birth_year = ''
let email = ''
let phone = '+1'
let phone_country_code = '1'
let activity = ''
let other_activity = ''

let loading = false

let validate = {
  name: true,
  email: true,
  phone: true,
  gender: true,
  activity: true,
  other_activity: true,
  birth_date: true,
  birth_month: true,
  birth_year: true,
  message: '',
  error: '',
}

$: name_border = validate.name ? '1px solid #f3f5f4' : '1px solid #dc3545'
$: name_bg = validate.name ? '#f3f5f4' : 'white'

$: birth_date_border = validate.birth_date ? '1px solid #f3f5f4' : '1px solid #dc3545'
$: birth_date_bg = validate.birth_date ? '#f3f5f4' : 'white'

$: birth_month_border = validate.birth_month ? '1px solid #f3f5f4' : '1px solid #dc3545'
$: birth_month_bg = validate.birth_month ? '#f3f5f4' : 'white'

$: year_border = validate.birth_year ? '1px solid #f3f5f4' : '1px solid #dc3545'
$: year_bg = validate.birth_year ? '#f3f5f4' : 'white'

$: email_border = validate.birth_year ? '1px solid #f3f5f4' : '1px solid #dc3545'
$: email_bg = validate.birth_year ? '#f3f5f4' : 'white'

$: phone_border = validate.birth_year ? '1px solid #f3f5f4' : '1px solid #dc3545'
$: phone_bg = validate.birth_year ? '#f3f5f4' : 'white'

$: other_border = validate.other_activity ? '1px solid #f3f5f4' : '1px solid #dc3545'
$: other_bg = validate.other_activity ? '#f3f5f4' : 'white'

const phone_listener = () => {
  if (!phone.startsWith(`+${phone_country_code}`)) {
    phone = `+${phone_country_code}`
    return
  }

  const format = phone.substring(phone_country_code.length+1)
                      .replace(/\D/g,'')
                      .replace(/\D+/g, '')

  if (format === '') {
    phone = `+${phone_country_code}`
    return
  }
  if (format.length > 10)
    return

  const match = format.replace(/^1/, '')
                      .match(/([^\d]*\d[^\d]*){1,10}$/)[0]
  const area_code = match.length > 2 ? `(${match.substring(0,3)})` : match
  const prefix = match.length > 3 ? ` ${match.substring(3, 6)}` : ''
  const subscriber = match.length > 6 ? ` ${match.substring(6, 10)}` : ''
  phone = `+${phone_country_code} ${area_code}${prefix}${subscriber}`
}

const register = async() => {
  validate.name = name != ''
  validate.birth_date = birth_date != ''
  validate.birth_month = birth_month != ''
  validate.birth_year = birth_year != ''
  validate.gender = gender == 'Male' || gender == 'Female'
  validate.other_activity = activity == 'Other' && other_activity != ''
  validate.activity = activity == 'Medicine' || activity == 'Tutoring' || validate.other_activity
  validate.email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  validate.birth_date = !(birth_date > new Date(parseInt(birth_year), parseInt(birth_month), 0).getDate())
  validate.phone = phone != '' && phone.substring(phone_country_code.length+1).replace(/\D+/g, '').length == 10

  validate.error = (!validate.email || !validate.phone) &&
                    validate.gender && validate.activity && validate.name &&
                    validate.birth_date && validate.birth_month && validate.birth_year
                  ? 'Enter valid email and phone number'
                  : !validate.gender || !validate.activity || !validate.name ||
                    !validate.birth_date || !validate.birth_month || !validate.birth_year
                  ? 'Fill all the spaces'
                  : ''

  if (validate.error == '') {
    loading = true

    const registration_data = {
      name,
      gender,
      email,
      phone_number: phone,
      activity: validate.other_activity ? other_activity : activity,
      birth_date: `${birth_month}/${birth_date}/${birth_year}\n`
    }
    // console.log(registration_data)

    emailjs.send('service_szidh7f', 'enohofikircharitywebsite', registration_data, 'user_SiEvtmyyPRXcl78CsCTWt').then(
      res => {
        validate.message = 'Request Sent!'
      },
      error => {
        validate.error = 'Failed to Send Request'
      }
    )

    // const form_id = '1DJIUhtTuhT_nkKedFpw-bRQS_BZVEYHN-KSh57lJ6nA'
    // const res = await fetch(`https://docs.google.com/forms/d/e/${form_id}/formResponse?usp=pp_url&entry.39112181=Menelik&entry.1312127952=Male&entry.1802411696=7/26/2005&entry.920961299=menelik.eyasu@gmail.com&entry.1214997693=%2B1+(571)+331+8223&entry.1489665384=Tutoring`)
  }
}
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div id="app">
  <Navbar />

  <div id="register">
    <div id="registration-form">
      <h1>Register a Volunteer</h1>

      <input type="text"
             placeholder="Full Name"
             class="text-input"
             bind:value={name}
             style="border: {name_border}; background-color: {name_bg};" />

      <div class="select-box">
        <button class={ gender=='Male' ? 'active-select-option' : 'select-option' } on:click={ () => gender = gender=='Male' ? '' : 'Male' }>Male</button>
        <button class={ gender=='Female' ? 'active-select-option' : 'select-option' } on:click={ () => gender = gender=='Female' ? '' : 'Female' }>Female</button>
      </div>

      <div id="select-date">
        <select bind:value={birth_month} style="border: {birth_month_border}; background-color: {birth_month_bg}">
          <option value="" selected disabled hidden>Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <input type="text"
              placeholder="Day"
              bind:value={birth_date}
              style="border: {birth_date_border}; background-color: {birth_date_bg};" />

        <input type="text"
              placeholder="Year"
              bind:value={birth_year}
              style="border: {year_border}; background-color: {year_bg};" />
      </div>

      <input type="text"
            placeholder="Email"
            class="text-input"
            bind:value={email}
            style="border: {email_border}; background-color: {email_bg};" />

      <div id="select-phone-number">
        <div id="select-country-code">
          <img width="34px" height="20px" src={country_codes.get(phone_country_code).src} />
          <i class="arrow-down"></i>
          <select bind:value={phone_country_code}
                  on:change={
                    () => {
                      phone = `+${phone_country_code}`.concat(phone.substring(phone_country_code.length+1))
                    }
                  }>
            {#each [...country_codes.keys()] as code}
              <option value={code}>{country_codes.get(code).name} (+{code})</option> 
            {/each}
          </select>
        </div>

        <input type="text"
              placeholder="Phone Number"
              class="text-input"
              bind:value={phone}
              on:input={phone_listener}
              style="border: {phone_border}; background-color: {phone_bg};" />
      </div>

      <div class="select-box">
        <button class={ activity=='Medicine' ? 'active-select-option' : 'select-option' } on:click={ () => activity = activity=='Medicine' ? '' : 'Medicine' }>Medicine</button>
        <button class={ activity=='Tutoring' ? 'active-select-option' : 'select-option' } on:click={ () => activity = activity=='Tutoring' ? '' : 'Tutoring' }>Tutoring</button>
        <button class={ activity=='Other' ? 'active-select-option' : 'select-option' } on:click={ () => activity = activity=='Other' ? '' : 'Other' }>Other</button>
      </div>

      {#if activity == 'Other' }
        <input type="text"
               placeholder="Other Activity"
               class="text-input"
               bind:value={other_activity}
               style="border: {other_border}; background-color: {other_bg};" />
      {/if}

      <button id="submit-form" on:click={register}>Register</button>
      <span>{validate.message}</span>
      <span>{validate.error}</span>
      {#if loading}
        <div id="loader-container"><div id="loader">Loading...</div></div>
      {/if}
    </div>

    <!-- <Footer /> -->
  </div>
</div>

<style>
#register {
  display: flex;
  margin-top: 64px;
  justify-content: center;

  overflow: hidden;
}

#register h1 {
  text-align: center;
  margin-bottom: 50px;
}

#registration-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 50px 0 calc(100vh - 546px);
}

span {
  color: #dc3545;
}

input:-webkit-autofill { -webkit-box-shadow:0 0 0 50px #f2f5f4 inset; }
input:-webkit-autofill:focus { -webkit-box-shadow: 0 0 0 50px #f2f5f4 inset; }

.text-input {
  width: 300px;
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  margin-bottom: 10px;
  -webkit-appearance: none;
}

#submit-form {
  width: 300px;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 15px;
  margin-bottom: 10px;
  border: 1px solid #007bff;
  background-color: #007bff;
}

#submit-form:hover {
  color: #007bff;
  background-color: white;
}

.select-box {
  display: inline-flex;
  width: 100%;
  gap: 12px;
  flex-direction: row;
}

.select-option, .active-select-option {
  flex-grow: 1;
  cursor: pointer;
  padding: 10px 0;
  border-radius: 5px;
  margin-bottom: 10px;
}

.select-option {
  color: #757575;
  border: 1px solid #d9d9d9;
  background-color: white;
}

.active-select-option {
  color: #1b81e6;
  background-color: white;
  border: 1px solid #1b81e6;
}

#select-date {
  display: flex;
  width: 340px;
  margin-bottom: 10px;
  justify-content: space-between;
}

#select-date input, #select-date select {
  width: 75px;
  border: none;
  color: #757575;
  border-radius: 5px;
  padding: 12px 20px;
}

#select-date select {
  width: 95px;
  cursor: pointer;
  text-indent: 1px;
  text-overflow: '';
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: #f3f5f4;
}

#select-phone-number {
  display: flex;
  flex-direction: row;
}

#select-phone-number input {
  width: 230px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

#select-country-code {
  display: flex;
  width: 70px;
  height: 41px;
  align-items: center;
  justify-content: flex-end;
  background-color: #f3f5f4;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

#select-country-code img {
  width: 34px;
  height: 20px;
}

#select-country-code select {
  position: absolute;
  width: 70px;
  height: 39px;
  cursor: pointer;
  color: transparent;
  border-color: transparent;
  background-color: transparent;
  border-top-right-radius: 0;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 5px;
}

.arrow-down {
  display: inline-block;
  padding: 3px;
  margin-left: 10px;
  margin-right: 5px;
  border: solid #757575;
  transform: rotate(45deg);
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
}

/* Loader */
#loader-container {
  height: 0;
}

#loader {
  position: relative;
  color: black;
  font-size: 11px;
  margin: 40px 0 0;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
  -ms-transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  -webkit-transform: translateZ(0);
}

#loader, #loader:before, #loader:after {
  width: 1em;
  height: 4em;
  background: black;
  animation: load 1s infinite ease-in-out;
  -webkit-animation: load 1s infinite ease-in-out;
}

#loader:before, #loader:after {
  position: absolute;
  top: 0;
  content: '';
}

#loader:before {
  left: -1.5em;
  animation-delay: -0.32s;
  -webkit-animation-delay: -0.32s;
}
#loader:after { left: 1.5em; }

@-webkit-keyframes load {
  0%, 80%, 100% {
    height: 4em;
    box-shadow: 0 0;
  }
  40% {
    height: 5em;
    box-shadow: 0 -2em;
  }
}

@keyframes load {
  0%, 80%, 100% {
    height: 4em;
    box-shadow: 0 0;
  }
  40% {
    height: 5em;
    box-shadow: 0 -2em;
  }
}
</style>
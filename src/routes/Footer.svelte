<footer id="main-footer">
  <div id="footer-columns">
    <div>
      <h3>Help</h3>
      <a href="/register">Register Volunteer</a>
      <a href="/sponsor">Sponsor a child</a>
      <a href="/donate">Donate</a>
    </div>

    <div>
      <h3>Contact Us</h3>
      <span>Address: Bole Sub City, Woreda 03, Babo Building, 4th Floor</span>
      <span>Phone 1: +0116894040</span>
      <span>Phone 2: +0911227544</span>
      <span>Email: <a href="mailto:enehofikir@outlook.com">enehofikir@outlook.com</a></span>
    </div>
  </div>

  <section>Copyright © Eneho Fiker 2019. All Rights Reserved.</section>
</footer>

<style>
#main-footer {
  display: flex;
  width: 100vw;
  font-size: 1em;
  padding: 30px 0px;
  flex-direction: column;
  background-color: #333;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}

#footer-columns {
  display: flex;
  width: 100vw;
  flex-direction: row;
  padding-bottom: 5em;
  justify-content: space-evenly;
}

#footer-columns div {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

span, a {
  color: #a5a7a9;
  margin-top: 10px;
  text-decoration: none;
}
a:hover { color: white; }

#footer-columns div span a:hover { text-decoration: underline; }

div h3 {
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
}

section {
  margin: 0 auto;
  color: #a5a7a9;
  align-self: flex-end;
}

/*     Responsive Media Queries     */
@media (orientation: portrait) {
  #footer-columns {
    display: flex;
    margin-left: 5vw;
    flex-direction: column;
  }

  #footer-columns div {
    margin-top: 20px;
  }
}
</style>
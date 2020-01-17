## Documentation

### Books
<details>
  <summary>
    <b>Get Books</b> - <i>returns list of 66 bible books</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/books`
  <br />
  <b>Authenticated:</b> No

  ```
  [
    {
      "abbrev": {"pt":"gn","en":"gn"},
      "author":"Moisés",
      "chapters":50,
      "group":"Pentateuco",
      "name":"Gênesis",
      "testament":"VT"
    },
    {
      "abbrev": {"pt":"ex","en":"ex"},
      "author":"Moisés",
      "chapters":40,
      "group":"Pentateuco",
      "name":"Êxodo",
      "testament":"VT"
    },
    ...
  ]
  ```
</details>

<details>
  <summary>
    <b>Get Book</b> - <i>return details of a bible book</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/books/:abbrev`
  <br />
  <b>Authenticated:</b> No

  ```
  {
    "abbrev": {"pt":"mt","en":"mt"},
    "author":"Mateus",
    "chapters":28,
    "comment":"",
    "group":"Evangelhos",
    "name":"Mateus",
    "testament":"NT"
  }
  ```
</details>


### Verses

<details>
  <summary>
    <b>Get Chapter</b> - <i>returns all verses and details of a chapter</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/verses/:version/:abbrev/:chapter`
  <br />
  <b>Authenticated:</b> No

  ```
  {
    "book": {
      "abbrev":{"pt":"gn","en":"gn"},
      "name":"Gênesis",
      "author":"Moisés",
      "group":"Pentateuco",
      "version":"nvi"
    },
    "chapter": {
      "number":1,
      "verses":31
    },
    "verses": [
      {"number": 1,"text":"No princípio Deus criou os céus e a terra."},
      {"number": 2,"text":"Era a terra sem forma e vazia; trevas cobriam a face do abismo, e o Espírito de Deus se movia sobre a face das águas."}
      ...
    ]
  }
  ```
</details>

<details>
  <summary>
    <b>Get Verse</b> - <i>returns a verse from a chapter</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/verses/:version/:abbrev/:chapter/:number`
  <br />
  <b>Authenticated:</b> No

  ```
  {
    "book": {
      "abbrev":{"pt":"gn","en":"gn"},
      "name":"Gênesis",
      "author":"Moisés",
      "group":"Pentateuco",
      "version":"nvi"
    },
    "chapter": {
      "number": 1,
      "verses": 31
    },
    "chapter": 1,
    "number": 1,
    "text": "No princípio Deus criou os céus e a terra."
  }
  ```
</details>

<details>
  <summary>
    <b>Search by word</b> - <i>returns verses with the searched word</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `POST https://bibleapi.co/api/verses/search`
  <br />
  <b>Authenticated:</b> No
  <br />
  <b>Body:</b>
  
  ```
  {
    "version": "nvi",
    "search": "terra"
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    "book": {
      "abbrev":{"pt":"gn","en":"gn"},
      "name":"Gênesis",
      "author":"Moisés",
      "group":"Pentateuco",
      "version":"nvi"
    },
    "chapter": {
      "number": 1,
      "verses": 31
    },
    "chapter": 1,
    "number": 1,
    "text": "No princípio Deus criou os céus e a terra."
  }
  ```
</details>


### Users

<i>The project will always be open source. Authentication is only to identify how many users are using the project and to inform about new updates.</i>

<details>
  <summary>
    <b>Create User</b> - <i>create a new user</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `POST https://bibleapi.co/api/users`
  <br />
  <b>Authenticated:</b> No
  <br />
  <b>Body:</b>
  
  ```
  {
    "name": "Name",
    "email": "email@email.com",
    "password": "102030", // minimum size 6 digits
    "notifications": true // receive update emails from bibleapi.co
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    name: "Name",
    email: "email@email.com",
    token: "eyJhbGciOiJIU...", // does not expire
    notifications: true
  }
  ```
</details>

<details>
  <summary>
    <b>Get User</b> - <i>returns a user</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/users/:email`
  <br />
  <b>Authenticated:</b> Yes
  <br />
  <b>Header:</b>
  
  ```
  { 
     Authorization: Bearer eyJhbGciOiJIU... 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    name: "Name",
    email: "email@email.com",
    token: "eyJhbGciOiJIU...", // does not expire
    notifications: true,
    lastLogin: "2020-01-01T16:59:22.862Z"
  }
  ```
</details>

<details>
  <summary>
    <b>Get User Stats</b> - <i>returns user statistics</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/users/stats`
  <br />
  <b>Authenticated:</b> Yes
  <br />
  <b>Header:</b>
  
  ```
  { 
     Authorization: Bearer eyJhbGciOiJIU... 
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    lastLogin: "2020-01-01T16:59:22.862Z",
    requestsPerMonth: [{
      range: '01/2020',
      total: 23
    },
    {
      range: '02/2020',
      total: 56
    }]
  }
  ```
</details>

<details>
  <summary>
    <b>Update Token</b> - <i>returns a token</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `PUT https://bibleapi.co/api/users/token`
  <br />
  <b>Authenticated:</b> No
  <br />
  <b>Body:</b>
  
  ```
  {
    "email": "email@email.com",
    "password": "102030",
  }
  ```
  <br />
  <b>Response:</b>

  ```
  {
    name: "Name",
    email: "email@email.com",
    token: "eyJhbGciOiJIU...", // does not expire
  }
  ```
</details>

<details>
  <summary>
    <b>Delete User</b> - <i>remove user</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `DELETE https://bibleapi.co/api/users`
  <br />
  <b>Authenticated:</b> Yes
  <br/>
  <b>Header:</b>
  
  ```
  { 
     Authorization: Bearer eyJhbGciOiJIU... 
  }
  ```
  <br />
  <b>Body:</b>
  
  ```
  {
    "email": "email@email.com",
    "password": "102030",
  }
  ```

  <br />
  <b>Response:</b>

  ```
  {
    msg: "User successfully removed",
  }
  ```
</details>

<details>
  <summary>
    <b>Resend User Password</b> - <i>send email</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `POST https://bibleapi.co/api/users/password/:email`
  <br />
  <b>Authenticated:</b> No
  <br />

  <br />
  <b>Response:</b>

  ```
  {
    msg: "New password successfully sent to email :email"
  }
  ```
</details>


### Requests

<details>
  <summary>
    <b>Get Requests</b> - <i>All period requests</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/requests/:range` (month, week, day)
  <br />
  <b>Authenticated:</b> Yes
  <br />
  <b>Response:</b>
  
  ```
  [
    {
        "url": "/api/verses/nvi/1co/9/8",
        "date": "2020-01-17T21:03:50.996Z"
    },
    {
        "url": "/api/books",
        "date": "2020-01-17T20:13:19.078Z"
    }
  ]
  ```
</details>

<details>
  <summary>
    <b>Get Number Requisitions</b> - <i>Number of requisitions for the period</i>
  </summary>
  <br/>
  
  <b>Endpoint:</b> `GET https://bibleapi.co/api/requests/amount/:range` (month, week, day)
  <br />
  <b>Authenticated:</b> Yes
  <br />
  <b>Response:</b>
  
  ```
  {
    "total": 3,
    "requests": [
      {
          "_id": "/api/books/",
          "count": 2
      },
      {
          "_id": "/api/verses/nvi/sl/23/",
          "count": 1
      }
  ]
  ```
</details>

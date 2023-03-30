# api-tool
Quickly create api from json data

### Installing
```
npm i api-create-toolkit
```

### Usage
It is better used in TS, with complete type prompts
```
import { createApi } from "api-create-tool"

const apiObj = {
  user: {
    login: "POST /api/v1/login"
  },
  file: {
    download: "GET /api/v1/download/{fileId}"
  },
  order: {
    list: "GET /api/v1/order/list"
  }
}

// If your project already has an instance of axios, 

const api = createApi<typeof apiObj>(apiObj, axiosInstance)

// If not, you can ignore the second parameter and send the request using axios by default

const api = createApi<typeof apiObj>(apiObj)

api.user.login({
  data: {
    username: "admin",
    password: "admin"
  }
})

api.file.download({
  path: {
    fileId: "1"
  }
})

api.order.list({
  params: {
    current: 1,
    size: 10
  }
})
```

also apiObj can be like: 
```
{
  a: {
    b: {
      c: ......
    }
  }
}
```
You can directly generate a json file for an API through some tools in Swagger. We will also provide related command-line tools to generate compliant API files in the future

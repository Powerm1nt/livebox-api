# API

## Requests

### **GET** - /status/info

#### CURL

```sh
curl -X GET "http://localhost:4242/status/info"
```

### **GET** - /status/reboot

#### CURL

```sh
curl -X GET "http://localhost:4242/status/reboot"
```

### **GET** - /status/check-updates

#### CURL

```sh
curl -X GET "http://localhost:4242/status/check-updates"
```

### **GET** - /status/wan-status

#### CURL

```sh
curl -X GET "http://localhost:4242/status/wan-status"
```

### **GET** - /status/nmc-status

#### CURL

```sh
curl -X GET "http://localhost:4242/status/nmc-status"
```

### **GET** - /users/all

#### CURL

```sh
curl -X GET "http://localhost:4242/users/all"
```

### **GET** - /firewall/rules

#### CURL

```sh
curl -X GET "http://localhost:4242/firewall/rules"
```

### **POST** - /firewall/add-rule

#### CURL

```sh
curl -X POST "http://localhost:4242/firewall/add-rule\
?commit=true" \
    -H "Content-Type: text/plain; charset=utf-8" \
    --data-raw "$body"
```

#### Query Parameters

- **commit** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "true"
  ],
  "default": "true"
}
```

#### Header Parameters

- **Content-Type** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "text/plain; charset=utf-8"
  ],
  "default": "text/plain; charset=utf-8"
}
```

#### Body Parameters

- **body** should respect the following schema:

```
{
  "type": "string",
  "default": "{\n  \"id\": \"webui_test_port\",\n  \"origin\": \"webui\",\n  \"description\": \"TEST PORT\",\n  \"sourceInterface\": \"data\",\n  \"internalPort\": \"6433\",\n  \"externalPort\": \"6543\",\n  \"destinationIPAddress\": \"10.0.0.38\",\n  \"protocol\": \"6\",\n  \"enable\": true,\n  \"permanent\": false\n}"
}
```

### **DELETE** - /firewall/delete-rule

#### CURL

```sh
curl -X DELETE "http://localhost:4242/firewall/delete-rule\
?commit=true" \
    -H "Content-Type: text/plain; charset=utf-8" \
    --data-raw "$body"
```

#### Query Parameters

- **commit** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "true"
  ],
  "default": "true"
}
```

#### Header Parameters

- **Content-Type** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "text/plain; charset=utf-8"
  ],
  "default": "text/plain; charset=utf-8"
}
```

#### Body Parameters

- **body** should respect the following schema:

```
{
  "type": "string",
  "default": "{\n  \"origin\": \"webui\",\n  \"id\": \"webui_test_port\"\n}"
}
```

### **GET** - /firewall/commit

#### CURL

```sh
curl -X GET "http://localhost:4242/firewall/commit"
```

### **POST** - /firewall/set-v4fwlvl

#### CURL

```sh
curl -X POST "http://localhost:4242/firewall/set-v4fwlvl" \
    -H "Content-Type: text/plain; charset=utf-8" \
    --data-raw "$body"
```

#### Header Parameters

- **Content-Type** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "text/plain; charset=utf-8"
  ],
  "default": "text/plain; charset=utf-8"
}
```

#### Body Parameters

- **body** should respect the following schema:

```
{
  "type": "string",
  "default": "{\n  \"level\": \"Medium\"\n}"
}
```

### **POST** - /firewall/set-v6fwlvl

#### CURL

```sh
curl -X POST "http://localhost:4242/firewall/set-v6fwlvl" \
    -H "Content-Type: text/plain; charset=utf-8" \
    --data-raw "$body"
```

#### Header Parameters

- **Content-Type** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "text/plain; charset=utf-8"
  ],
  "default": "text/plain; charset=utf-8"
}
```

#### Body Parameters

- **body** should respect the following schema:

```
{
  "type": "string",
  "default": "{\n  \"level\": \"Medium\"\n}"
}
```

### **POST** - /firewall/ping-config

#### CURL

```sh
curl -X POST "http://localhost:4242/firewall/ping-config" \
    -H "Content-Type: text/plain; charset=utf-8" \
    --data-raw "$body"
```

#### Header Parameters

- **Content-Type** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "text/plain; charset=utf-8"
  ],
  "default": "text/plain; charset=utf-8"
}
```

#### Body Parameters

- **body** should respect the following schema:

```
{
  "type": "string",
  "default": "{\n  \"enableIPv4\": true,\n  \"enableIPv6\": true\n}"
}
```

### **GET** - /firewall/ping-config

#### CURL

```sh
curl -X GET "http://localhost:4242/firewall/ping-config"
```

### **GET** - /devices/all

#### CURL

```sh
curl -X GET "http://localhost:4242/devices/all"
```

## References


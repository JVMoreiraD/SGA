# Choose whatever you want, version >= 1.16
FROM golang:1.22-alpine

RUN apk add --no-cache git
WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

RUN go install github.com/cosmtrek/air@latest

RUN air init

COPY . .

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]

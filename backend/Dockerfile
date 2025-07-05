FROM golang:1.24-alpine

RUN apk add --no-cache git
WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

RUN go install github.com/air-verse/air@latest

RUN air init

COPY . .

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]

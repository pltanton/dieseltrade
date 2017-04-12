package handlers

import (
	"context"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var secret = []byte("secret")

// Claims represents structure of JWT
type Claims struct {
	Name string `json:"name"`
	jwt.StandardClaims
}

// TODO: replace with normal storage
var credentials = map[string]string{
	"root": "toor",
}

// InitSession authentificates user and stores username in context
func InitSession(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	name := r.FormValue("name")
	password := r.FormValue("password")

	// TODO: replace with normal storage
	passwordBase, ok := credentials[name]
	if ok && passwordBase == password {
		ctx := context.WithValue(r.Context(), contextKeyName, name)
		next(w, r.WithContext(ctx))
	} else {
		w.WriteHeader(http.StatusUnauthorized)
	}
}

// GenerateJWT geterates jwt from username in context
func GenerateJWT(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	expireToken := time.Now().AddDate(0, 3, 0).Unix()

	claims := Claims{
		Name(r.Context()),
		jwt.StandardClaims{
			ExpiresAt: expireToken,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// TODO: read secret from cofig file
	signedToken, err := token.SignedString(secret)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write([]byte(signedToken))

	next(w, r)
}

// RequireTokenAuth is a midleware which checks JWT token by Authorization header
// and passes parsed token context
func RequireTokenAuth(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	tokenString := r.Header.Get("JWT")
	if tokenString == "" {
		cookieJWT, err := r.Cookie("JWT")
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("No JWT provided"))
			log.Println(err)
			log.Println(r.Cookies())
			return
		}
		tokenString = cookieJWT.Value
	}
	// TODO: read secret from cofig file
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		log.Println(err)
	} else {
		ctx := context.WithValue(r.Context(), contextKeyJWT, token)
		next(w, r.WithContext(ctx))
	}
}

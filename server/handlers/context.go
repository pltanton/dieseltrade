package handlers

import (
	"context"
)

type contextKey string

var (
	contextKeyLogin = contextKey("login")
	contextKeyJWT   = contextKey("jwt")
)

// Login extracts email from context
func Login(ctx context.Context) string {
	return ctx.Value(contextKeyLogin).(string)
}

// ExtractToken extracts token from context
func ExtractToken(ctx context.Context) string {
	return ctx.Value(contextKeyJWT).(string)
}

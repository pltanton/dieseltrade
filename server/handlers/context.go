package handlers

import (
	"context"
)

type contextKey string

var (
	contextKeyName = contextKey("name")
	contextKeyJWT  = contextKey("jwt")
)

// Name extracts email from context
func Name(ctx context.Context) string {
	return ctx.Value(contextKeyName).(string)
}

// ExtractToken extracts token from context
func ExtractToken(ctx context.Context) string {
	return ctx.Value(contextKeyJWT).(string)
}

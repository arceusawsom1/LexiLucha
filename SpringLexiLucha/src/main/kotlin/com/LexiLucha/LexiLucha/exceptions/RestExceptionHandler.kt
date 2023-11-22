package com.LexiLucha.LexiLucha.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice


@RestControllerAdvice
class RestExceptionHandler {

    @ExceptionHandler(ConflictException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handle(e: ConflictException): ApiErrorResponse {
        return ApiErrorResponse(e.message!!)
    }
}
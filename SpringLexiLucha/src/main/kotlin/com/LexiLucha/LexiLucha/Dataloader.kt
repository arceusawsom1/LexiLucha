package com.LexiLucha.LexiLucha

import com.LexiLucha.LexiLucha.controller.MainController
import com.LexiLucha.LexiLucha.model.Question
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Service

@Service
class Dataloader @Autowired constructor(val questionRepo: QuestionRepository): ApplicationRunner  {



    override fun run(args: ApplicationArguments?) {
        val questions: ArrayList<Question> = ArrayList()
        questions.add(Question("¿Dónde está la biblioteca?", "Where is the library?", "I need to study."))
        questions.add(Question("¿Cómo te llamas?", "What's your name?", "Nice to meet you."))
        questions.add(Question("¿Cuántos años tienes?", "How old are you?", "I like your haircut."))
        questions.add(Question("¿Qué hora es?", "What time is it?", "Let's go to the park."))
        questions.add(Question("¿Dónde vives?", "Where do you live?", "I love your dog."))
        questions.add(Question("¿Qué te gusta hacer?", "What do you like to do?", "It's a beautiful day."))
        questions.add(Question("¿Cuál es tu comida favorita?", "What's your favorite food?", "I prefer reading books."))
        questions.add(Question("¿Qué quieres hacer mañana?", "What do you want to do tomorrow?", "Let's go to the beach."))
        questions.add(Question("¿Cómo estás?", "How are you?", "I'm feeling tired."))
        questions.add(Question("¿Dónde trabajas?", "Where do you work?", "I need a vacation."))
        questions.add(Question("¿Qué estás haciendo?", "What are you doing?", "I'm watching TV."))
        questions.add(Question("¿Cuál es tu deporte favorito?", "What's your favorite sport?", "I like hiking."))
        questions.add(Question("¿Cuál es tu canción favorita?", "What's your favorite song?", "Music makes me happy."))
        questions.add(Question("¿Qué estudias en la universidad?", "What do you study at the university?", "I want to travel."))
        questions.add(Question("¿Tienes mascotas?", "Do you have pets?", "I enjoy cooking."))
        questions.add(Question("¿Cuál es tu libro favorito?", "What's your favorite book?", "Reading is fun."))
        questions.add(Question("¿Qué quieres ser en el futuro?", "What do you want to be in the future?", "I'm a good cook."))
        questions.add(Question("¿Cuál es tu lugar favorito para vacacionar?", "What's your favorite vacation spot?", "I like to dance."))
        questions.add(Question("¿Cuál es tu película favorita de terror?", "What's your favorite horror movie?", "I enjoy gardening."))
        questions.add(Question("¿Dónde te gustaría vivir?", "Where would you like to live?", "I'm learning to paint."))
        questions.add(Question("¿Qué tipo de música te gusta?", "What kind of music do you like?", "I like to travel."))
        questions.add(Question("¿Qué idiomas hablas?", "What languages do you speak?", "I want to learn French."))
        questions.add(Question("¿Cuál es tu pasatiempo favorito?", "What's your favorite hobby?", "I love the beach."))
        questions.add(Question("¿Tienes alguna alergia?", "Do you have any allergies?", "I enjoy hiking."))
        questions.add(Question("¿Qué te gustaría cenar esta noche?", "What would you like for dinner tonight?", "I like swimming."))
        questions.add(Question("¿Cuál es tu programa de televisión favorito?", "What's your favorite TV show?", "I like to cook."))
        questions.add(Question("¿Qué deportes practicas?", "What sports do you play?", "I'm a good swimmer."))
        questions.add(Question("¿Cuál es tu destino de viaje soñado?", "What's your dream travel destination?", "I enjoy painting."))
        questions.add(Question("¿Tienes hermanos mayores?", "Do you have older siblings?", "I like to go hiking."))
        questions.add(Question("¿Qué te hace feliz?", "What makes you happy?", "I'm a movie buff."))
        questions.add(Question("¿Cuál es tu restaurante favorito?", "What's your favorite restaurant?", "I like photography."))
        questions.add(Question("¿Cuál es tu película de ciencia ficción favorita?", "What's your favorite science fiction movie?", "I enjoy camping."))
        questions.add(Question("¿Cuál es tu destino de viaje favorito?", "What's your favorite travel destination?", "I like to write."))
        questions.add(Question("¿Qué te motiva?", "What motivates you?", "I'm a nature lover."))
        questions.add(Question("¿Cuál es tu postre favorito?", "What's your favorite dessert?", "I enjoy knitting."))
        questions.add(Question("¿Qué te hace reír?", "What makes you laugh?", "I like to play chess."))
        questions.add(Question("¿Cuál es tu plato principal favorito?", "What's your favorite main dish?", "I enjoy bird watching."))
        questions.add(Question("¿Qué te preocupa?", "What worries you?", "I like to go fishing."))
        questions.add(Question("¿Cuál es tu color favorito?", "What's your favorite color?", "I enjoy playing soccer."))
        questions.add(Question("¿Cuál es tu animal favorito?", "What's your favorite animal?", "I love to read books."))
        questions.add(Question("¿Qué quieres hacer el fin de semana?", "What do you want to do on the weekend?", "Let's go for a walk."))
        questions.add(Question("¿Cuál es tu lugar de vacaciones ideal?", "What's your ideal vacation spot?", "I like to watch movies."))
        questions.add(Question("¿Cuál es tu hobby principal?", "What's your main hobby?", "I enjoy playing the guitar."))
        questions.add(Question("¿Tienes alguna meta a largo plazo?", "Do you have any long-term goals?", "I want to learn to cook."))
        questions.add(Question("¿Cuál es tu película favorita de comedia?", "What's your favorite comedy movie?", "I like to paint."))
        questions.add(Question("¿Tienes hermanos menores?", "Do you have younger siblings?", "I like to travel."))
        questions.add(Question("¿Qué te inspira?", "What inspires you?", "I enjoy going for a run."))
        questions.add(Question("¿Cuál es tu serie de televisión preferida?", "What's your favorite TV series?", "I love gardening."))
        questions.add(Question("¿Cuál es tu plato étnico favorito?", "What's your favorite ethnic dish?", "I like photography."))
        questions.add(Question("¿Tienes alguna fobia?", "Do you have any phobias?", "I enjoy playing chess."))
        questions.add(Question("¿Cuál es tu bebida favorita?", "What's your favorite drink?", "I like to go fishing."))
        questions.add(Question("¿Cuál es tu deporte de equipo favorito?", "What's your favorite team sport?", "I'm a history buff."))
        questions.add(Question("¿Cuál es tu día de la semana preferido?", "What's your favorite day of the week?", "I like to cook."))
        questions.add(Question("¿Cuál es tu asignatura favorita?", "What's your favorite subject?", "I enjoy swimming."))
        questions.add(Question("¿Qué te gustaría aprender en el futuro?", "What would you like to learn in the future?", "I'm a nature enthusiast."))
        questions.add(Question("¿Cuál es tu tienda favorita?", "What's your favorite store?", "I like to knit."))
        questions.add(Question("¿Cuál es tu estación del año preferida?", "What's your favorite season?", "I'm a tech geek."))
        questions.add(Question("¿Tienes un artista o banda favorita?", "Do you have a favorite artist or band?", "I enjoy bird watching."))
        questions.add(Question("¿Qué te gustaría mejorar en ti mismo?", "What would you like to improve about yourself?", "I like to go camping."))
        questions.add(Question("¿Cuál es tu superhéroe favorito?", "Who's your favorite superhero?", "I enjoy writing poetry."))
        questions.add(Question("¿Cuál es tu lugar para relajarte?", "What's your go-to relaxation spot?", "I like to play video games."))
        questions.add(Question("¿Tienes alguna rutina de ejercicios?", "Do you have an exercise routine?", "I'm a history enthusiast."))
        questions.add(Question("¿Cuál es tu comida rápida preferida?", "What's your favorite fast food?", "I like to go hiking."))
        questions.add(Question("¿Cuál es tu libro de no ficción favorito?", "What's your favorite non-fiction book?", "I enjoy playing soccer."))
        questions.add(Question("¿Tienes una película clásica favorita?", "Do you have a favorite classic movie?", "I love to read books."))
        questions.add(Question("¿Cuál es tu lugar histórico favorito?", "What's your favorite historical site?", "Let's go for a walk."))
        questions.add(Question("¿Tienes alguna tradición familiar especial?", "Do you have any special family traditions?", "I like to watch movies."))
        questions.add(Question("¿Cuál es tu talento oculto?", "What's your hidden talent?", "I enjoy playing the guitar."))
        questions.add(Question("¿Qué te hace sentir agradecido?", "What makes you feel grateful?", "I want to learn to cook."))
        questions.add(Question("¿Cuál es tu comida picante favorita?", "What's your favorite spicy food?", "I like to paint."))
        questions.add(Question("¿Tienes alguna meta de viaje?", "Do you have a travel goal?", "I like to travel."))
        questions.add(Question("¿Cuál es tu película favorita de acción?", "What's your favorite action movie?", "I enjoy going for a run."))
        questions.add(Question("¿Cuál es tu plato de desayuno preferido?", "What's your favorite breakfast dish?", "I love gardening."))
        questions.add(Question("¿Tienes una mascota?", "Do you have a pet?", "I like photography."))
        questions.add(Question("¿Cuál es tu lugar natural favorito?", "What's your favorite natural place?", "I enjoy playing chess."))
        questions.add(Question("¿Tienes alguna meta profesional?", "Do you have any career goals?", "I like to go fishing."))
        questionRepo.saveAll(questions)
    }
}
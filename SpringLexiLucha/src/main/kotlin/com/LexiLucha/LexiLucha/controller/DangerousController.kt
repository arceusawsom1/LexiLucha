package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController("danger")
class DangerousController @Autowired constructor (val questionRepo: QuestionRepository) {

    @GetMapping("loadNewData")
    fun saveQuestions(){
        val questions: ArrayList<Question> = ArrayList()
        // SWEDISH
        questions.add(Question("Vad är dina hobbies?", "What are your hobbies?", "Hiking enthusiast, bookworm", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad är den senaste boken du läste?", "What is the last book you read?", "Mystery novel fan, avid reader", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad är din favoritmat?", "What is your favorite food?", "Sushi lover, pizza enthusiast", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad brukar du göra på helgerna?", "What do you usually do on weekends?", "Movie buff, nature explorer", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad är den senaste filmen du såg?", "What is the last movie you watched?", "Action movie fan, film critic", language= LANGUAGE.SWEDISH))
        questions.add(Question("Har du några karriärmål?", "Do you have any career goals?", "Entrepreneurial spirit, career dreamer", language= LANGUAGE.SWEDISH))
        questions.add(Question("Berätta om ditt jobb.", "Tell me about your job.", "IT professional, problem solver", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad är din favoritresedestination?", "What is your favorite travel destination?", "Beach lover, adventure seeker", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vilken typ av musik gillar du?", "What kind of music do you like?", "Jazz enthusiast, classical music lover", language= LANGUAGE.SWEDISH))
        questions.add(Question("Gör du saker med vänner?", "Do you do things with friends?", "Coffee enthusiast, social butterfly", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad är din favoritsport?", "What is your favorite sport?", "Soccer fan, tennis player", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad studerade du när du var student?", "What did you study when you were a student?", "Economics major, history buff", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad gillar du med Sverige?", "What do you like about Sweden?", "Nature lover, cultural explorer", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad är din mest minnesvärda semester?", "What is your most memorable holiday?", "Road trip adventurer, beachcomber", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad är din första upplevelse med sushi?", "What is your first experience with sushi?", "Sushi tasting experience, culinary adventure", language= LANGUAGE.SWEDISH))
        questions.add(Question("Gillar du att träna?", "Do you like to exercise?", "Yoga practitioner, gym enthusiast", language= LANGUAGE.SWEDISH))
        questions.add(Question("Läser du engelska nu?", "Are you reading SPANISH now?", "Language learner, book lover", language= LANGUAGE.SWEDISH))
        questions.add(Question("Gillar du inte att titta på filmer?", "Don't you like watching movies?", "Movie critic, film buff", language= LANGUAGE.SWEDISH))
        questions.add(Question("Berätta, vad heter du?", "Tell me, what is your name?", "Coffee aficionado, language learner", language= LANGUAGE.SWEDISH))
        questions.add(Question("Vad kan du göra?", "What can you do?", "Multilingual communicator, problem solver", language= LANGUAGE.SWEDISH))

        // REVERSE SPANISH QUESTIONS
        questions.add(Question("What are your hobbies?", "¿Cuáles son tus hobbies?", "Amante de la música, excursionista", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What is the last book you read?", "¿Cuál es el último libro que leíste?", "Fanático de la historia, ávido lector", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What is your favorite food?", "¿Cuál es tu comida favorita?", "Amante de la cocina, explorador culinario", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What do you usually do on weekends?", "¿Qué haces normalmente los fines de semana?", "Explorador urbano, amante de la naturaleza", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What is the last movie you watched?", "¿Cuál es la última película que viste?", "Crítico de cine, aficionado a las comedias", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("Do you have any career goals?", "¿Tienes algún objetivo profesional?", "Emprendedor, soñador de carrera", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("Tell me about your job.", "Cuéntame sobre tu trabajo.", "Profesional del marketing, solucionador de problemas", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What is your favorite travel destination?", "¿Cuál es tu destino de viaje favorito?", "Aventurero, amante de la playa", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What kind of music do you like?", "¿Qué tipo de música te gusta?", "Melómano, aficionado al jazz", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("Do you do things with friends?", "¿Haces cosas con amigos?", "Amante del café, explorador social", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What is your favorite sport?", "¿Cuál es tu deporte favorito?", "Fanático del fútbol, jugador de tenis", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What did you study when you were a student?", "¿Qué estudiaste cuando eras estudiante?", "Estudiante de economía, amante de la historia", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What do you like about Spain?", "¿Qué te gusta de España?", "Amante de la cultura, explorador de la comida", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What is your most memorable holiday?", "¿Cuál es tu día festivo más memorable?", "Aventurero en carretera, amante de la playa", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What is your first experience with paella?", "¿Cuál es tu primera experiencia con la paella?", "Degustador de paella, aventurero culinario", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("Do you like to exercise?", "¿Te gusta hacer ejercicio?", "Practicante de yoga, entusiasta del gimnasio", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("Are you reading Spanish now?", "¿Estás leyendo español ahora?", "Aprendiz de idiomas, amante de los libros", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("Don't you like watching movies?", "¿No te gusta ver películas?", "Crítico de cine, aficionado a las películas", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("Tell me, what is your name?", "Dime, ¿cuál es tu nombre?", "Aficionado al café, aprendiz de idiomas", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))
        questions.add(Question("What can you do?", "¿Qué puedes hacer?", "Comunicador multilingüe, solucionador de problemas", language= LANGUAGE.SPANISH, mode= QUESTIONMODE.REVERSE))


        questions.forEach{it.answer=it.answer.lowercase().trimEnd('?','.','!')}
        questions.forEach{it.noiseWords=it.noiseWords.lowercase().trimEnd('?','.','!')}
        questionRepo.saveAll(questions)
    }
}
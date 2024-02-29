package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.dal.ShopItemRepository
import com.LexiLucha.LexiLucha.dal.UserRepository
import com.LexiLucha.LexiLucha.model.CustomBoard
import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.ShopItem
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import com.LexiLucha.LexiLucha.model.shopItems.BackgroundColor
import com.LexiLucha.LexiLucha.model.shopItems.BorderColor
import com.LexiLucha.LexiLucha.model.shopItems.TextColor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("danger")
class DangerousController @Autowired constructor (val userRepository: UserRepository,val questionRepo: QuestionRepository, val shopItemRepository: ShopItemRepository) {
    @GetMapping("ping")
    fun getAllQuestions() : List<Question>{
        return questionRepo.findAll()
    }
    @GetMapping("newBoards")
    fun giveUsersCustoms(){
        val users = userRepository.findAll()
        users.forEach { it.custom= CustomBoard() }
        userRepository.saveAll(users)
    }
    @GetMapping("loadNewData")
    fun saveQuestions(){
        // Creating some shop items
        val questions : ArrayList<Question> =  ArrayList<Question>()
        //HINDI QUESTIONS
        questions.add(Question("आपका व्यक्तित्व कैसा है?", "How would you describe your personality?", "outgoing introverted adventurous optimistic", language=LANGUAGE.HINDI))
        questions.add(Question("आपको कौनसा खाना अच्छा लगता है?", "What food do you like?", "pizza pasta sushi curry", language=LANGUAGE.HINDI))
        questions.add(Question("आपको क्या खबर है?", "What's the news?", "politics sports entertainment technology", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे एक किताब चाहिए", "I want a book", "library novel author pages", language=LANGUAGE.HINDI))
        questions.add(Question("आपको किस खेल में खेलने का शौक है?", "Which sport do you enjoy playing?", "football basketball cricket tennis", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे गरम चाय पसंद है", "I like hot tea", "cup saucer kettle leaves", language=LANGUAGE.HINDI))
        questions.add(Question("मेरे पास समय नहीं है", "I don't have time", "clock watch hour minutes", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे बहुत भूख लगी है", "I'm very hungry", "plate fork knife food", language=LANGUAGE.HINDI))
        questions.add(Question("मैंने एक नया गाना सिखा", "I learned a new song", "lyrics melody rhythm chorus", language=LANGUAGE.HINDI))
        questions.add(Question("आपको कौन सा फल पसंद है?", "Which fruit do you like?", "apple banana orange mango", language=LANGUAGE.HINDI))
        questions.add(Question("मेरा सपना है कि मैं दुनिया घूमूं", "My dream is to travel the world", "passport suitcase tickets adventure", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे यह बहुत पसंद है", "I like it very much", "favorite enjoy appreciate love", language=LANGUAGE.HINDI))
        questions.add(Question("आपको कौनसी फिल्म देखने का मन है?", "Which movie do you feel like watching?", "comedy drama thriller horror", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे ठंडा पानी पीना पसंद है", "I like to drink cold water", "glass bottle ice refreshing", language=LANGUAGE.HINDI))
        questions.add(Question("मेरे पास अधिक धन्यवाद के लिए शब्द नहीं हैं", "I don't have enough words to thank you", "grateful appreciation thankful indebted", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे उस नए रेस्तरां का पता है", "I know the address of that new restaurant", "map directions location menu", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे नहीं पता", "I don't know", "confusion uncertainty clueless puzzled", language=LANGUAGE.HINDI))
        questions.add(Question("मेरे पास समय है", "I have time", "clock watch hour minutes", language=LANGUAGE.HINDI))
        questions.add(Question("यह बहुत मजेदार है", "This is very entertaining", "fun enjoyable amusing laughter", language=LANGUAGE.HINDI))
        questions.add(Question("मैं यह समझ गया", "I understand", "comprehend grasp get it", language=LANGUAGE.HINDI))
        questions.add(Question("आपका स्वागत है", "You're welcome", "hospitality generosity politeness kindness", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे यह अच्छा नहीं लगता", "I don't like this", "dislike unpleasant not good", language=LANGUAGE.HINDI))
        questions.add(Question("मेरे लिए एक कॉफ़ी लाइन है", "I'll have a coffee, please", "cup mug espresso latte", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे यहाँ बैठना पसंद है", "I like sitting here", "chair comfortable relaxing position", language=LANGUAGE.HINDI))
        questions.add(Question("यहाँ बहुत अच्छा मौसम है", "The weather here is very nice", "sunny breezy pleasant temperature", language=LANGUAGE.HINDI))
        questions.add(Question("मेरा दिल खुश है", "My heart is happy", "joy happiness contentment smile", language=LANGUAGE.HINDI))
        questions.add(Question("मुझे खुशी हो रही है", "I am happy", "smile laughter joy contentment", language=LANGUAGE.HINDI))
        questions.add(Question("आपका नाम क्या है?", "What is your name?", "lamp guitar flower computer", language=LANGUAGE.HINDI))
        questions.add(Question("आप कहाँ से हैं?", "Where are you from?", "coffee beach bicycle umbrella", language=LANGUAGE.HINDI))
        questions.add(Question("मैंने अपना काम पूरा कर दिया है", "I have finished my work", "task assignment completion achievement", language=LANGUAGE.HINDI))

        questionRepo.saveAll(questions)
    }
}
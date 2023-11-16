import { Gender } from "../models/gender.model.js";
import { LevelStudy } from "../models/levelStudy.model.js";
import { Locality } from "../models/locality.model.js";
import { Option } from "../models/option.model.js";
import { Question } from "../models/question.model.js";
import { Respondent } from "../models/respondent.model.js";

export const respondentCount = async (_req, res) => {
    try {
        const respondentsCount = await Respondent.count()

        res.json({
            status: 200,
            respondentsCount
        })
    } catch (error) {
        console.log(error)
    }
}

export const respondentAnswers = async (req, res) => {
    try {
        
        const respondents = await Respondent.findAll({
            include: [
                LevelStudy,
                Gender, 
                Locality,
                Question,
                Option
            ]
        })
        const allQuestions = await Question.findAll();

        const r = respondents.map(re => {

            const options = re.Options.map(e => {
                return {
                    option: e.option,
                    QuestionId : e.QuestionId,
                    question: allQuestions.filter(m  => m.id == e.QuestionId)[0].question
                }
            })

            const questions = re.Questions.map(e => {
                return {
                   question: e.question,
                   response: e.QuestionRespondent.respondentResponse
                }
            })

            const respondent = {
                age: re.age,
                locality: re.Locality.name,
                levelStudy: re.LevelStudy.name,
                gender: re.Gender.name,   
                options,
                questions                             
            }
            return respondent;
        })

        res.json({
            status: 200,
            respondents: r
        })
    } catch (error) {
        console.log(error)
    }
}
import { Survey } from "./survey.model.js";
import { Question } from "./question.model.js";
import { Option } from "./option.model.js";
import { Respondent } from "./respondent.model.js";



Survey.hasMany(Question);

Question.belongsTo(Survey, {
  foreignKey: {
    name: "surveyId",
  },
});
Question.hasMany(Option);
Option.belongsTo(Question, {
  foreignKey: {
    name: "questionId",
  },
})

Option.belongsToMany(Respondent, {
  through: 'option_respondent'
});
Respondent.belongsToMany(Option, {
  through: 'option_respondent'
});
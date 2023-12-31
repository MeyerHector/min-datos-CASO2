import { Survey } from "./survey.model.js";
import { Question } from "./question.model.js";
import { Option } from "./option.model.js";
import { Respondent } from "./respondent.model.js";
import { Gender } from "./gender.model.js";
import { Locality } from "./locality.model.js";
import { LevelStudy } from "./levelStudy.model.js";
import { QuestionRespondent } from "./question.respondent.model.js";
import { createDefaultValues } from "../utils/createDefaultValues.js";

Survey.hasMany(Question, { onDelete: "cascade", hooks: true });

Question.belongsTo(Survey, {
  foreignKey: {
    name: "surveyId",
  },
});
Question.hasMany(Option, { onDelete: "cascade", hooks: true });
Option.belongsTo(Question, {
  foreignKey: {
    name: "questionId",
  },
});

Option.belongsToMany(Respondent, {
  through: "option_respondent",
});
Respondent.belongsToMany(Option, {
  through: "option_respondent",
});

Gender.hasMany(Respondent);
Respondent.belongsTo(Gender, {
  foreignKey: {
    name: "genderId",
  },
});

Locality.hasMany(Respondent);
Respondent.belongsTo(Locality, {
  foreignKey: {
    name: "localityId",
  },
});
LevelStudy.hasMany(Respondent);
Respondent.belongsTo(LevelStudy, {
  foreignKey: {
    name: "levelStudyId",
  },
});

Respondent.belongsToMany(Question, { through: QuestionRespondent });
Question.belongsToMany(Respondent, { through: QuestionRespondent });


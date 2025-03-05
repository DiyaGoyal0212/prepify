const questionSchema = new mongoose.Schema({
  role: String,
  question: String,
  difficulty: String,  // Add difficulty level to the schema
});

module.exports = mongoose.model('Question', questionSchema);

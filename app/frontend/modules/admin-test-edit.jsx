import React from 'react'
import fetch from 'isomorphic-fetch'

const AnswerOptionSchema = {
  text: '',
  result_text: '',
  image: '',
  weight: 0
}

const QuestionSchema = {
  text: '',
  image: '',
  answer_options: []
}

const TestResultSchema = {
  text: '',
  image: '',
  min_weight: 0,
  max_weight: 1
}

const testCheckFields = [
  {
    key: 'title',
    value: ''
  },
  {
    key: 'subtitle',
    value: ''
  },
  {
    key: 'image',
    value: ''
  }
]

const questionCheckFields = [
  {
    key: 'text',
    value: ''
  },
  {
    key: 'image',
    value: ''
  }
]

const answerOptionCheckFields = [
  {
    key: 'text',
    value: ''
  },
  {
    key: 'result_text',
    value: ''
  }
]

const testResultCheckFields = [
  {
    key: 'text',
    value: ''
  },
  {
    key: 'image',
    value: ''
  }
]

let checkFields = (source, fields) => {
  fields.forEach(field => {
    source[field.key] = source[field.key] == null ? '' : source[field.key]
  })
  return source
}

export default class AdminTestEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: {
        title: '',
        subtitle: '',
        image: ''
      },
      questions: [],
      test_results: []
    }
  }

  componentDidMount() {
    fetch(`/api/tests/${this.props.match.params.test_id}`)
      .then(res => res.json())
      .then(res => {
        res.test = checkFields(res.test, testCheckFields)
        res.test.questions.forEach(q => {
          q = checkFields(q, questionCheckFields)
          q.answer_options.forEach(o => o = checkFields(o, answerOptionCheckFields))
        })
        res.test.test_results.forEach(r => r = checkFields(r, testResultCheckFields))
        this.setState({test: res.test, questions: res.test.questions, test_results: res.test.test_results})
      })
  }

  handleTestInputChange(e) {
    let test = Object.assign({}, this.state.test)
    test[e.target.name] = e.target.value
    this.setState({test})
  }

  handleQuestionInputChange(e, qIndex) {
    let questions = this.state.questions.slice()
    let question = questions[qIndex]
    question[e.target.name] = e.target.value
    this.setState({questions})
  }

  handleAnswerOptionInputChange(e, qIndex, oIndex) {
    let questions = this.state.questions.slice()
    let question = questions[qIndex]
    let option = question.answer_options[oIndex]
    option[e.target.name] = e.target.value
    this.setState({questions})
  }

  handleTestResultInputChange(e, i) {
    let test_results = this.state.test_results.slice()
    let result = test_results[i]
    result[e.target.name] = e.target.value
    this.setState({test_results})
  }

  addQuestion(e) {
    let questions = this.state.questions.slice()
    questions.push(Object.assign({order: questions.length}, QuestionSchema))
    this.setState({questions})
  }

  saveQuestion(e, i) {
    let questions = this.state.questions.slice()
    let question = questions[i]
    let req_options = {
      method: question._id == null ? 'POST' : 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    }
    let url = `${Settings.host}/api/tests/${this.state.test._id}/`
    url += `questions/${question._id == null ? '' : question._id}`
    fetch(url, req_options)
      .then(res => res.json())
      .then(res => {
        question = Object.assign({}, res.question)
        questions[i] = question
        this.setState({questions})
      })
  }

  addAnswerOption(e, qIndex) {
    let questions = this.state.questions.slice()
    let question = questions[qIndex]
    question.answer_options.push(Object.assign({}, AnswerOptionSchema))
    this.setState({questions})
  }

  saveAnswerOption(e, qIndex, oIndex) {
    let questions = this.state.questions.slice()
    let question = questions[qIndex]
    let option = question.answer_options[oIndex]
    let req_options = {
      method: option._id == null ? 'POST' : 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(option)
    }
    let url = `${Settings.host}/api/tests/${this.state.test._id}/questions/${question._id}/`
    url += `answer_options/${option._id == null ? '' : option._id}`
    fetch(url, req_options)
      .then(res => res.json())
      .then(res => {
        option = Object.assign({}, res.answer_option)
        question.answer_options[oIndex] = option
        this.setState({questions})
      })
  }

  addTestResult() {
    let test_results = this.state.test_results.slice()
    test_results.push(Object.assign({}, TestResultSchema))
    this.setState({test_results})
  }

  saveTestResult(e, i) {
    let test_results = this.state.test_results.slice()
    let test_result = test_results[i]
    let req_options = {
      method: test_result._id == null ? 'POST' : 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(test_result)
    }
    let url = `${Settings.host}/api/tests/${this.state.test._id}/`
    url += `test_results/${test_result._id == null ? '' : test_result._id}`
    fetch(url, req_options)
      .then(res => res.json())
      .then(res => {
        test_result = Object.assign({}, res.test_result)
        test_results[i] = test_result
        this.setState({test_results})
      })
  }

  saveTest() {
    let test = Object.assign({}, this.state.test)
    delete test.questions
    delete test.test_results
    let req_options = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(test)
    }
    let url = `${Settings.host}/api/tests/${test._id}`
    fetch(url, req_options)
      .then(res => res.json())
      .then(res => this.setState({test: res.test}))
  }

  render() {
    let handleTestInputChange = this.handleTestInputChange.bind(this)
    let handleQuestionInputChange = this.handleQuestionInputChange.bind(this)
    let handleAnswerOptionInputChange = this.handleAnswerOptionInputChange.bind(this)
    let handleTestResultInputChange = this.handleTestResultInputChange.bind(this)
    return (
      <div className="b-admin-test-edit">
        <button onClick={this.saveTest.bind(this)}>Сохранить тест</button>
        <br/>
        <label htmlFor="testTitle">Название</label>
        <input type="text" id="testTitle" name="title" value={this.state.test.title} onChange={(e) => handleTestInputChange(e)} />
        <br/>
        <label htmlFor="testSubtitle">Подзаголовок</label>
        <input type="text" id="testSubtitle" name="subtitle" value={this.state.test.subtitle} onChange={(e) => handleTestInputChange(e)} />
        <br/>
        <label htmlFor="testImage">Картинка</label>
        <input type="text" id="testImage" name="image" value={this.state.test.image} onChange={(e) => handleTestInputChange(e)} />
        <br/>
        <label htmlFor="testPublish">Опубликован?</label>
        <input type="checkbox" id="testPublish" name="published" value={this.state.test.published} onChange={(e) => handleTestInputChange(e)} />
        <br/>
        <div className="b-admin-test-questions">
          <h3>
            Вопросы ({this.state.questions.length})
            <button onClick={this.addQuestion.bind(this)}>Добавить вопрос</button>
          </h3>
          {this.state.questions.map((question, i) => (
            <div className="b-admin-test-question" key={i}>
              <label htmlFor={"qText"+i}>Текст вопроса </label>
              <input type="text" id={"qText"+i} value={question.text} name="text" onChange={(e) => handleQuestionInputChange(e, i)} />
              <br/>
              <label htmlFor={"qImage"+i}>Картинка вопроса </label>
              <input type="text" id={"qImage"+i} value={question.image} name="image" onChange={(e) => handleQuestionInputChange(e, i)} />
              <br/>
              <label htmlFor={"qResText"+i}>Текст при нажатии </label>
              <input type="text" id={"qResTest"+i} value={question.result_text} name="result_text" onChange={(e) => handleQuestionInputChange(e, i)} />
              <br/>
              <div className="b-admin-answer_options" style={{'marginLeft': '20px'}}>
                <h4> Варианты ответа ({question.answer_options.length})
                  <button onClick={(e) => this.addAnswerOption(e, i)}> Добавить вариант ответа </button>
                </h4>
                {question.answer_options.map((option, j) => (
                  <div className="b-admin-answer_option" key={j}>
                    <label htmlFor={"oText"+j}>Текст варианта ответа</label>
                    <br/>
                    <input type="text" id={"oText"+j} name="text" value={option.text} onChange={(e) => handleAnswerOptionInputChange(e, i, j)} />
                    <br/>
                    <label htmlFor={"oWeiht"+j}>Вес варианта ответа</label>
                    <br/>
                    <input type="number" id={"oWeight"+j} name="weight" value={option.weight} onChange={(e) => handleAnswerOptionInputChange(e, i, j)} />
                    <br/>
                    <button onClick={(e) => this.saveAnswerOption(e, i, j)}> Сохранить </button>
                    <br/>
                    <br/>
                  </div>
                ))}
              </div>
              <button onClick={(e) => this.saveQuestion(e, i)} >Сохранить вопрос</button>
              <hr/>
            </div>
          ))}
        </div>
        <br/><br/>
        <div className="b-admin-test-results">
          <h3>
            Результаты
            <button onClick={this.addTestResult.bind(this)}>Добавить результат</button>
          </h3>
          {this.state.test_results.map((result, i) => (
            <div className="b-admin-test-result" key={i}>
              <label htmlFor={"resText"+i}>Текст</label>
              <input type="text" id={"resText"+i} name="text" value={result.text} onChange={(e) => handleTestResultInputChange(e, i)} />
              <br/>
              <label htmlFor={"resImage"+i}>Картинка</label>
              <input type="text" id={"resImage"+i} name="image" value={result.image} onChange={(e) => handleTestResultInputChange(e, i)} />
              <br/>
              <label htmlFor={"resMin"+i}>Мин. вес</label>
              <input type="number" id={"resMin"+i} name="min_weight" value={result.min_weight} onChange={(e) => handleTestResultInputChange(e, i)} />
              <br/>
              <label htmlFor={"resMax"+i}>Макс. вес</label>
              <input type="number" name="max_weight" value={result.max_weight} onChange={(e) => handleTestResultInputChange(e, i)} />
              <br/>
              <button onClick={(e) => this.saveTestResult(e, i)}>Сохранить результат</button>
            </div>
          ))}
        </div>
        <button onClick={this.saveTest.bind(this)}>Сохранить тест</button>
      </div>
    )
  }
}

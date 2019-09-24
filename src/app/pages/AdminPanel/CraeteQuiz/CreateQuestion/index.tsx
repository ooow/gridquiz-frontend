import React, {ChangeEvent, Component} from 'react';
import CreateAnswers, {CreateAnswersState} from './CreateAnswers';
import Dropdown from 'reactstrap/lib/Dropdown';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {NewQuestion} from '../../../../model/Question';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';

enum QuestionType {
    TEXT = 'Text',
    CODE = 'Code',
}

interface CreateQuestionProps {
    onClick: (newQuestion: NewQuestion) => void;
}

interface CreateQuestionState {
    text: string;
    answers: string[];
    correctAnswer: string;
    dropdownOpen: boolean;
    questionType: QuestionType;
    code: string;
}

const defaultCode = `
@SpringBootApplication
public class GridQuizApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(GridQuizApplication.class, args);
        // This is an example, you can write any code here.
    }
}
`;

class CreateQuestion extends Component<CreateQuestionProps, CreateQuestionState> {
    constructor(props: CreateQuestionProps) {
        super(props);

        this.state = {
            text: '',
            answers: [],
            correctAnswer: '',
            dropdownOpen: false,
            questionType: QuestionType.TEXT,
            code: defaultCode,
        };
    }

    changeText(event: ChangeEvent<HTMLInputElement>) {
        this.setState({text: event.target.value});
    }

    changeAnswers(event: CreateAnswersState) {
        this.setState({
            answers: event.answers,
            correctAnswer: event.correctAnswer.value,
        });
    }

    handleTypeChange(e: any) {
        if (this.state.questionType !== e.target.textContent) {
            this.setState({questionType: e.target.textContent});
        }
    }

    handelCodeChange(code: any) {
        this.setState({code: code});
    }

    handelAdd() {
        const {onClick} = this.props;
        const {text, answers, correctAnswer, code, questionType} = this.state;

        if (this.isQuestionValid()) {
            const newQuestion: NewQuestion = {
                text,
                answers,
                correctAnswer,
                code: questionType === QuestionType.CODE ? code : undefined,
            };
            onClick(newQuestion);
        }
    }

    isQuestionValid(): boolean {
        const {code, questionType} = this.state;

        switch (questionType) {
            case QuestionType.TEXT:
                return this.basicValidation();
            case QuestionType.CODE:
                return code.length > 0 && this.basicValidation();
            default:
                return false;
        }
    }

    basicValidation(): boolean {
        const {text, answers, correctAnswer} = this.state;
        return text.length > 0 && answers.length > 1 && correctAnswer.length > 0;
    }

    toggleDropdown() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    renderCodeBlock() {
        const {code} = this.state;
        return (
            <div className='d-flex flex-column'>
                <h5>Code</h5>
                <AceEditor
                    mode="java"
                    theme="monokai"
                    name="code-editor"
                    className='w-100 rounded'
                    style={{height: 250}}
                    value={code}
                    onChange={this.handelCodeChange.bind(this)}
                />
                <h5 className='mt-2'>Users will see:</h5>
                <SyntaxHighlighter language='java' className='code-block'>
                    {code}
                </SyntaxHighlighter>
            </div>
        );
    }

    render() {
        const {text, questionType} = this.state;
        return (
            <div id='create-question' className='container border rounded'>
                <div className='d-flex justify-content-between my-3'>
                    <h4>New Question</h4>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.handelAdd.bind(this)}
                    >
                        Add
                    </button>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">1</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Question"
                        aria-label="Question text"
                        value={text}
                        onChange={this.changeText.bind(this)}
                    />
                    <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggleDropdown.bind(this)}
                    >
                        <DropdownToggle caret>{questionType}</DropdownToggle>
                        <DropdownMenu onClick={this.handleTypeChange.bind(this)}>
                            <DropdownItem>{QuestionType.TEXT}</DropdownItem>
                            <DropdownItem>{QuestionType.CODE}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {questionType === QuestionType.CODE && this.renderCodeBlock()}
                <h4>Answers</h4>
                <CreateAnswers changeAnswers={this.changeAnswers.bind(this)} />
            </div>
        );
    }
}

export default CreateQuestion;

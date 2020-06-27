import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import Board from '../Board';

import QuestionRow from './QuestionRow';

const spacing = '1.5rem';

const StyledAppBar = styled(AppBar)`
    margin-bottom: ${spacing};
`;

const CategoryTextField = styled(TextField)`
    &, label, input, div {
        font-size: 1.4rem;
        line-height: 1.4rem;
    }
`;

const QuestionRowContainer = styled.div`
    display: grid;

    grid-gap: ${spacing};
    grid-template-columns: 1fr 1fr;
`;

const BoardColumn = styled.div`
    display: grid;

    grid-gap: ${spacing};
`;

const CategoryContainer = styled.div`
    display: grid;

    grid-gap: ${spacing};
`;

const StyledPaper = styled(Paper)`
    padding: ${spacing};
`;

const StyledForm = styled.form``;

const ColumnHeader = styled.div``;

const boardPropType = PropTypes.arrayOf(
    PropTypes.shape({
        category: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
            PropTypes.shape({
                clue: PropTypes.string.isRequired,
                answer: PropTypes.string.isRequired,
                dailyDouble: PropTypes.bool.isRequired,
            }).isRequired,
        ).isRequired,
    }).isRequired,
);

const createDefaultBoard = () => (
    Array(6).fill(0).map(() => ({
        category: '',
        questions: Array(5).fill(0).map(() => ({
            clue: '',
            answer: '',
            dailyDouble: false,
        })),
    }))
);

export default class QuestionsForm extends React.Component {
    static propTypes = {
        initialGame: PropTypes.shape({
            jeopardy: boardPropType,
            doubleJeopardy: boardPropType,
            finalJeopardy: PropTypes.shape({
                clue: PropTypes.string.isRequired,
                answer: PropTypes.string.isRequired,
            }),
        }),
    }

    static defaultProps = {
        initialGame: {
            jeopardy: createDefaultBoard(),
            doubleJeopardy: createDefaultBoard(),
            finalJeopardy: {
                clue: '',
                answer: '',
            },
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            game: props.initialGame,
            activeTab: 0,
        };
    }

    _getValueKeyForTab(tabIndex) {
        return ['jeopardy', 'doubleJeopardy', 'finalJeopardy'][tabIndex];
    }
    
    _handleQuestionRowTextChange = (event) => {
        const {
            value,
            type,
            name,
        } = event.currentTarget;

        const [
            valueKey,
            categoryIndex,
            questionIndex,
        ] = name.split(':');

        this.setState((currentState) => {
            currentState.game[valueKey][categoryIndex].questions[questionIndex][type] = value;

            return currentState;
        });
    }

    _renderRows({
        multiplier,
        valueKey,
        questions,
        categoryIndex,
    }) {
        let rv = [];

        for (let i = 0; i < 5; i++) {
            const points = (i + 1) * 200 * multiplier;

            rv.push(
                <QuestionRowContainer key={i}>
                    <QuestionRow
                        name={`${valueKey}:${categoryIndex}:${i}`}
                        clue={questions[i].clue}
                        answer={questions[i].answer}
                        dailyDouble={questions[i].dailyDouble}
                        points={points}
                        spacing={spacing}
                        onChange={this._handleQuestionRowTextChange}
                    />
                </QuestionRowContainer>
            );
        }

        return rv;
    }

    _renderCategories(tabIndex) {
        let rv = [];
        const valueKey = this._getValueKeyForTab(tabIndex);
        const boardValue = this.state.game[valueKey];

        for (let i = 0; i < 6; i++) {
            const categoryValue = boardValue[i];

            rv.push(
                <StyledPaper key={i}>
                    <BoardColumn>
                        <ColumnHeader>
                            <CategoryTextField
                                id={`category-${i}`}
                                label={`Category ${i + 1}`}
                                value={categoryValue.category}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => {
                                    const { value } = event.currentTarget;

                                    this.setState((currentState) => {
                                        currentState.game[valueKey][i].category = value;

                                        return currentState;
                                    });
                                }}
                            />
                        </ColumnHeader>
                        {this._renderRows({
                            multiplier: tabIndex + 1,
                            valueKey,
                            categoryIndex: i,
                            questions: categoryValue.questions,
                        })}
                    </BoardColumn>
                </StyledPaper>
            );
        }

        return rv;
    }

    _renderTabs(activeTab) {
        let rv = [];

        let i = 0;

        for (; i < 2; i++) {
            rv.push(
                <Board key={i} index={i} value={activeTab}>
                    <CategoryContainer>
                        {this._renderCategories(i)}
                    </CategoryContainer>
                </Board>
            );
        }

        const finalJeopardyValue = this.state.game[this._getValueKeyForTab(i)];

        rv.push(
            <Board key={i} index={i} value={activeTab}>
                <StyledPaper>
                    <BoardColumn>
                        <QuestionRowContainer>
                            <TextField
                                id="final-question"
                                label="Final Clue"
                                multiline 
                                rows="4"
                                variant="outlined"
                                value={finalJeopardyValue.clue}
                                onChange={(event) => {
                                    const { value } = event.currentTarget;

                                    this.setState((currentState) => {
                                        currentState.game.finalJeopardy.clue = value;

                                        return currentState;
                                    });
                                }}
                            />
                            <TextField
                                id="final-answer"
                                label="Final Answer"
                                multiline 
                                rows="4"
                                variant="outlined"
                                value={finalJeopardyValue.answer}
                                onChange={(event) => {
                                    const { value } = event.currentTarget;

                                    this.setState((currentState) => {
                                        currentState.game.finalJeopardy.answer = value;

                                        return currentState;
                                    });
                                }}
                            />
                        </QuestionRowContainer>
                    </BoardColumn>
                </StyledPaper>
            </Board>
        );

        return rv;
    }

    _handleTabChange = (event, newValue) => {
        this.setState({
            activeTab: newValue,
        });
    }

    render() {
        const { activeTab } = this.state;

        return (
            <StyledForm noValidate autoComplete="off">
                <StyledAppBar position="sticky">
                    <Tabs
                        value={activeTab}
                        onChange={this._handleTabChange}
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Jeopardy" />
                        <Tab label="Double Jeopardy" />
                        <Tab label="Final Jeopardy" />
                    </Tabs>
                </StyledAppBar>
                {this._renderTabs(activeTab)}
            </StyledForm>
        );
    }
}

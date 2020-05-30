import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import Board from './Board';

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

const QuestionRow = styled.div`
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
    Array(6).fill({
        category: '',
        questions: Array(5).fill({
            clue: '',
            answer: '',
            dailyDouble: false,
        }),
    })
);

export default class QuestionsForm extends React.PureComponent {
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

    _renderRows(tabIndex, questions) {
        const multiplier = tabIndex + 1;
        let rv = [];

        for (let i = 0; i < 5; i++) {
            const points = (i + 1) * 200 * multiplier;

            rv.push(
                <QuestionRow key={i}>
                    <TextField
                        id={`question-${i}`}
                        label={`${points.toLocaleString()} Point Clue`}
                        multiline 
                        rows="2"
                        variant="outlined"
                        value={questions[i].clue}
                        onChange={(event) => console.log(event.currentTarget.value)}
                    />
                    <TextField
                        id={`answer-${i}`}
                        label={`${points.toLocaleString()} Point Answer`}
                        multiline 
                        rows="2"
                        variant="outlined"
                        value={questions[i].answer}
                    />
                </QuestionRow>
            );
        }

        return rv;
    }

    _renderCategories(tabIndex) {
        let rv = [];
        const boardValue = this.state.game[this._getValueKeyForTab(tabIndex)];

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
                            />
                        </ColumnHeader>
                        {this._renderRows(tabIndex, categoryValue.questions)}
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
                        <QuestionRow>
                            <TextField
                                id="final-question"
                                label="Final Clue"
                                multiline 
                                rows="4"
                                variant="outlined"
                                value={finalJeopardyValue.clue}
                            />
                            <TextField
                                id="final-answer"
                                label="Final Answer"
                                multiline 
                                rows="4"
                                variant="outlined"
                                value={finalJeopardyValue.answer}
                            />
                        </QuestionRow>
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

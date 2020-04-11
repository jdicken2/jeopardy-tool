import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const spacing = '1.5rem';

const CategoryTextField = styled(TextField)`
    &, label, input, div {
        font-size: 1.4rem;
        line-height: 1.4rem;
    }
`;

const QuestionOptions = styled.div`
    display: inline-grid;
    grid-gap: ${spacing};
`;

const QuestionRow = styled.div`
    display: grid;

    grid-gap: ${spacing};
    grid-template-columns: 1.5fr 1.5fr 1fr;
`;

const FinalQuestionRow = styled.div`
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

const Board = styled.div``;

const StyledForm = styled.form`
    display: grid;

    grid-gap: ${spacing};
`;

export default class BoardMaker extends React.PureComponent {
    _renderRows(multiplier = 1) {
        let rv = [];

        for (let i = 1; i <= 5; i++) {
            const points = i * 200 * multiplier;

            rv.push(
                <QuestionRow key={i}>
                    <TextField
                        id={`question-${i}`}
                        label={`${points} Point Clue`}
                        multiline 
                        rows="2"
                        variant="outlined"
                    />
                    <TextField
                        id={`answer-${i}`}
                        label={`${points} Point Answer`}
                        multiline 
                        rows="2"
                        variant="outlined"
                    />
                    <QuestionOptions>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="daily-double"
                                />
                            }
                            label="Daily Double"
                        />
                    </QuestionOptions>
                </QuestionRow>
            );
        }

        return rv;
    }

    _renderCategories(multiplier = 1) {
        let rv = [];

        for (let i = 1; i <= 5; i++) {
            rv.push(
                <BoardColumn key={i}>
                    <CategoryTextField
                        id={`category-${i}`}
                        label={`Category ${i}`}
                        fullWidth
                    />
                    {this._renderRows(multiplier)}
                </BoardColumn>
            );
        }

        return rv;
    }

    _renderBoards() {
        let rv = [];

        for (let i = 1; i <= 2; i++) {
            rv.push(
                <Board>
                    <Typography variant="h2" component="h2" gutterBottom>
                        {i === 2 ? 'Double Jeopardy' : 'Jeopardy'}
                    </Typography>
                    <CategoryContainer>
                        {this._renderCategories(i)}
                    </CategoryContainer>
                </Board>
            );
        }

        return rv;
    }

    _renderFinalJeopardy() {
        return (
            <React.Fragment>
                <Typography variant="h2" component="h2" gutterBottom>
                    Final Jeopardy
                </Typography>
                <BoardColumn>
                    <FinalQuestionRow>
                        <TextField
                            id="final-question"
                            label="Final Clue"
                            multiline 
                            rows="4"
                            variant="outlined"
                        />
                        <TextField
                            id="final-answer"
                            label="Final Answer"
                            multiline 
                            rows="4"
                            variant="outlined"
                        />
                    </FinalQuestionRow>
                </BoardColumn>
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h1" component="h1">
                    New Game
                </Typography>
                <StyledForm noValidate autoComplete="off">
                    {this._renderBoards()}
                    {this._renderFinalJeopardy()}
                </StyledForm>
            </React.Fragment>
        );
    }
}

import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const StyledTextField = styled(TextField)``;

const QuestionOptions = styled.div`
    display: inline-grid;
    grid-gap: 2rem;
`;

const QuestionRow = styled.div`
    ${StyledTextField}:not(:last-child) {
        margin-right: 2rem;
    }
`;

const BoardColumn = styled.div``;

const StyledForm = styled.form``;

export default function BoardMaker() {
    return (
        <React.Fragment>
            <Typography variant="h1" component="h1">
                Create New Game
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
                Board 1
            </Typography>
            <StyledForm noValidate autoComplete="off">
                <BoardColumn>
                    <StyledTextField
                        id="category-1"
                        style={{ marginBottom: '2rem' }}
                        label="Category 1"
                        fullWidth 
                        rows="4"
                    />
                    <QuestionRow>
                        <StyledTextField
                            id="question-1"
                            label="Clue 1"
                            multiline 
                            rows="4"
                            variant="outlined"
                        />
                        <StyledTextField
                            id="answer-1"
                            label="Answer 1"
                            multiline 
                            rows="4"
                            variant="outlined"
                        />
                        <QuestionOptions>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="daily-double"
                                        />
                                    }
                                    label="Daily Double"
                                />
                            </div>
                            <div>
                                <StyledTextField
                                    id="points"
                                    type="number"
                                    label="Points"
                                    value="100"
                                    variant="outlined"
                            />
                            </div>
                        </QuestionOptions>
                    </QuestionRow>
                </BoardColumn>
            </StyledForm>
        </React.Fragment>
    );
}

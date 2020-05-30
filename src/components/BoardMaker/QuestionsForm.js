import React from 'react';
import styled from 'styled-components';

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

export default class QuestionsForm extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    _renderRows(multiplier = 1) {
        let rv = [];

        for (let i = 1; i <= 5; i++) {
            const points = i * 200 * multiplier;

            rv.push(
                <QuestionRow key={i}>
                    <TextField
                        id={`question-${i}`}
                        label={`${points.toLocaleString()} Point Clue`}
                        multiline 
                        rows="2"
                        variant="outlined"
                    />
                    <TextField
                        id={`answer-${i}`}
                        label={`${points.toLocaleString()} Point Answer`}
                        multiline 
                        rows="2"
                        variant="outlined"
                    />
                </QuestionRow>
            );
        }

        return rv;
    }

    _renderCategories(multiplier = 1) {
        let rv = [];

        for (let i = 1; i <= 6; i++) {
            rv.push(
                <StyledPaper>
                    <BoardColumn key={i}>
                        <ColumnHeader>
                            <CategoryTextField
                                id={`category-${i}`}
                                label={`Category ${i}`}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </ColumnHeader>
                        {this._renderRows(multiplier)}
                    </BoardColumn>
                </StyledPaper>
            );
        }

        return rv;
    }

    _renderTabs(activeTab) {
        let rv = [];

        let i = 1;

        for (; i <= 2; i++) {
            rv.push(
                <Board index={i - 1} value={activeTab}>
                    <CategoryContainer>
                        {this._renderCategories(i)}
                    </CategoryContainer>
                </Board>
            );
        }

        rv.push(
            <Board index={i - 1} value={activeTab}>
                <StyledPaper>
                    <BoardColumn>
                        <QuestionRow>
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
                        </QuestionRow>
                    </BoardColumn>
                </StyledPaper>
            </Board>
        );

        return rv;
    }

    render() {
        const { activeTab, onTabChange, } = this.props;

        return (
            <StyledForm noValidate autoComplete="off">
                <StyledAppBar position="sticky">
                    <Tabs
                        value={activeTab}
                        onChange={onTabChange}
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

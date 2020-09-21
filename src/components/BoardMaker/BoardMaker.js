import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
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

export default class BoardMaker extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tab: 0,
        };
    }

    _handleTabChange = (event, newValue) => {
        this.setState({
            tab: newValue,
        });
    }

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
                </QuestionRow>
            );
        }

        return rv;
    }

    _renderCategories(multiplier = 1) {
        let rv = [];

        for (let i = 1; i <= 5; i++) {
            rv.push(
                <StyledPaper>
                    <BoardColumn key={i}>
                        <CategoryTextField
                            id={`category-${i}`}
                            label={`Category ${i}`}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {this._renderRows(multiplier)}
                    </BoardColumn>
                </StyledPaper>
            );
        }

        return rv;
    }

    _renderTabs(selectedTab) {
        let rv = [];

        let i = 1;

        for (; i <= 2; i++) {
            rv.push(
                <Board index={i - 1} value={selectedTab}>
                    <CategoryContainer>
                        {this._renderCategories(i)}
                    </CategoryContainer>
                </Board>
            );
        }

        rv.push(
            <Board index={i - 1} value={selectedTab}>
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
            <center>
               <button type="button"> Create Board </button> 
            </center>
            </Board>
        );

        return rv;
    }

    render() {
        const { tab } = this.state;

        return (
            <React.Fragment>
                <Typography variant="h1" component="h1">
                    New Game
                </Typography>
                <StyledForm noValidate autoComplete="off">
                    <StyledAppBar position="sticky">
                        <Tabs value={tab} onChange={this._handleTabChange} variant="fullWidth" centered>
                            <Tab label="Jeopardy" />
                            <Tab label="Double Jeopardy" />
                            <Tab label="Final Jeopardy" />
                        </Tabs>
                    </StyledAppBar>
                    {this._renderTabs(tab)}
                </StyledForm>
            </React.Fragment>
        );
    }
}

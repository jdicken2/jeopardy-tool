import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

function QuestionRow({
    name,
    points,
    clue,
    answer,
    dailyDouble,
    onChange,
}) {
    const pointsDisplayString = points.toLocaleString();

    return (
        <React.Fragment>
            <TextField
                label={`${pointsDisplayString} Point Clue`}
                multiline 
                rows="2"
                variant="outlined"
                value={clue}
                onChange={(event) => {
                    const { value } = event.currentTarget;

                    onChange({
                        currentTarget: {
                            name,
                            type: 'clue',
                            value,
                        },
                    });
                }}
            />
            <TextField
                label={`${pointsDisplayString} Point Answer`}
                multiline 
                rows="2"
                variant="outlined"
                value={answer}
                onChange={(event) => {
                    const { value } = event.currentTarget;

                    onChange({
                        currentTarget: {
                            name,
                            type: 'answer',
                            value,
                        },
                    });
                }}
            />
        </React.Fragment>
    );
}

QuestionRow.propTypes = {
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    clue: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    dailyDouble: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(QuestionRow);

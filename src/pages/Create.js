import React from 'react';
import BoardMaker from 'Components/BoardMaker';
import Container from '@material-ui/core/Container';

export default function Create() {
    return (
        <Container maxWidth="md">
            <BoardMaker />
        </Container>
    );
}

import React from 'react'
import PropTypes from 'prop-types'

import { Container, Label, Modal, Header, Image, Icon, Rating } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const BookDetails = props => {
    const { open, onClose, book } = props
    const {
        imageLinks,
        title,
        subtitle,
        authors,
        description,
        pageCount,
        publishedDate,
        averageRating,
        ratingsCount
    } = book

    return (
        <Modal dimmer={true} open={open} onClose={onClose}>
            <Modal.Content image scrolling>
                <Image
                    size='medium'
                    wrapped
                    src={imageLinks.thumbnail} />
                <Container>
                    <Modal.Description>
                        <Header as='h3'>
                            {title}
                            <Header.Subheader>
                                {subtitle}
                                <p><Icon name='users' size='small' />{authors.map(author => `${author}; `)}</p>
                            </Header.Subheader>
                        </Header>

                        <p><b>Description: </b>{description}</p>

                        <Label.Group size='medium'>
                            <Label as='a'>Pages:<Label.Detail>{pageCount}</Label.Detail></Label>
                            <Label as='a'>Year:<Label.Detail>{publishedDate.split('-', 1)}</Label.Detail></Label>

                            {ratingsCount &&
                                <Label as='a'>
                                    Rating: 
                                    <Rating
                                        icon='star'
                                        defaultRating={averageRating}
                                        maxRating={5}
                                        size='mini' />
                                    {`  (${ratingsCount})`}
                                </Label>
                            }
                        </Label.Group>

                    </Modal.Description>
                </Container>
            </Modal.Content>
        </Modal>
    )
}

BookDetails.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: PropTypes.object
}

export default BookDetails
import React from 'react'
import ModalComponent from './ModalComponent'
import { Button, ButtonGroup, Container, Image } from 'react-bootstrap'
import { useState } from 'react'

const FeedBackModal = ({ show = false, handleClose }) => {
    const [selectedReaction, setSelectedReaction] = useState(null)
    const [selectedType, setSelectedType] = useState(0)
    const reactions = [
        {
            text: 'Very Unsatisfied',
            image: "/images/reactions/very-unsatisfied.svg",
            toggledImage: "/images/reactions/very-unsatisfied-toggled.svg"
        },
        {
            text: 'Unsatisfied',
            image: "/images/reactions/unsatisfied.svg",
            toggledImage: "/images/reactions/unsatisfied-toggled.svg"
        },
        {
            text: 'Neutral',
            image: "/images/reactions/neutral.svg",
            toggledImage: "/images/reactions/neutral-toggled.svg"
        },
        {
            text: 'Satisfied',
            image: "/images/reactions/satisfied.svg",
            toggledImage: "/images/reactions/satisfied-toggled.svg"
        },
        {
            text: 'Very Satisfied',
            image: "/images/reactions/very-satisfied.svg",
            toggledImage: "/images/reactions/very-satisfied-toggled.svg"
        },
    ]

    return (
        <ModalComponent closeButton show={show} handleClose={handleClose} title='Your Feedback'>
            <Container>
                <div className="text-center">
                    <p className='mt-2 mb-3 text-secondary'>We would like your feedback to improve this system.</p>
                    <p className='my-2 text-secondary'>What is your opinion of this system?</p>
                </div>
                <br />
                <div className="flex justify-center gap-4 mt-2 mb-2">
                    {
                        reactions.map((reaction, index) => (
                            <div key={index}>
                                {
                                    index == selectedReaction ? (
                                        <Image
                                            className='cursor-pointer scale-[1.15]'
                                            width={50}
                                            height={50}
                                            src={reaction.toggledImage}
                                            alt={reaction.text}
                                        />

                                    ) : (
                                        <Image
                                            className='hover:scale-[1.15] cursor-pointer'
                                            width={50}
                                            height={50}
                                            src={reaction.image}
                                            alt={reaction.text}
                                            onClick={() => setSelectedReaction(index)}

                                        />
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
                <hr />
                <p className="text-center mt-2 mb-3 text-secondary text-sm">Please select your feedback category below.</p>
                <div className="text-center mt-2">
                    <ButtonGroup className="mb-2">
                        {
                            ['Suggestion', 'Something is not quite right', 'Compliment']
                                .map((item, index) => (
                                    <Button key={index} onClick={() => setSelectedType(index)} variant='outline-purple' active={selectedType == index}>
                                        <small>{item}</small>
                                    </Button>
                                ))
                        }
                    </ButtonGroup>
                </div>
                <hr />
                <p className="text-secondary mb-2">
                    Please leave your feedback below:
                </p>
                <textarea className='form-control' rows={5} placeholder='Your feedback here..'>
                </textarea>
                <div className="text-end mt-3">
                    <Button variant='purple' className='rounded-1'>Submit</Button>
                </div>
            </Container>
        </ModalComponent>
    )
}

export default FeedBackModal
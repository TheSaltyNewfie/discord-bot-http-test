import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@nextui-org/react"
import { ButtonGroup, Button } from "@nextui-org/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react"

export type Message = {
    channelId: string
    guildId: string
    id: string
    createdTimestamp: number
    type: number
    system: boolean
    content: string
    authorId: string
    pinned: boolean
    tts: boolean
    nonce: string | null
    embeds: Array<{
        type: string
        url: string
        title: string
        color: number
        timestamp: string
        fields: Array<{
            name: string
            value: string
            inline: boolean
        }>
        footer: {
            text: string
        }
        content_scan_version: number
    }>
    components: Array<unknown>
    attachments: Array<unknown>
    stickers: Array<unknown>
    position: number | null
    roleSubscriptionData: unknown | null
    resolved: unknown | null
    editedTimestamp: string | null
    mentions: {
        everyone: boolean
        users: Array<unknown>
        roles: Array<unknown>
        crosspostedChannels: Array<unknown>
        repliedUser: unknown | null
        members: Array<unknown>
        channels: Array<unknown>
    }
    webhookId: string | null
    groupActivityApplicationId: string | null
    applicationId: string | null
    activity: unknown | null
    flags: number
    reference: unknown | null
    interaction: unknown | null
    poll: unknown | null
    cleanContent: string
}


export const ChannelViewer = ({
    isOpen,
    onClose,
    channel_id
}: {
    isOpen: boolean;
    onClose: () => void;
    channel_id: string;
}) => {

    const [messages, setMessages] = useState<Message[]>([])

    const getMessages = async () => {
        const res = await axios.get(`http://localhost:3000/api/bot/channels/messages/${BigInt(channel_id)}`)

        setMessages(res.data)
    }

    useEffect(() => {
        if (isOpen) getMessages()
    }, [channel_id])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isDismissable={true} className="h-dvh">
            <ModalContent>
                <ModalHeader>Channel Viewer</ModalHeader>
                <ModalBody>
                    <div className="h-dvh overflow-auto">
                        {messages.map((message) => (
                            <Card key={message.id}>
                                <CardHeader>
                                    {message.authorId}
                                </CardHeader>
                                <CardBody>
                                    {
                                        message.embeds.length ?
                                            <div>
                                                <p className="italic">Embed</p>
                                                <p>{message.embeds[0].title}</p>
                                                {
                                                    message.embeds[0].fields ?
                                                        <div>
                                                            <p>{message.embeds[0].fields[0].name}:</p>
                                                            <p>{message.embeds[0].fields[0].value}</p>
                                                        </div>
                                                        :
                                                        <p>No Fields</p>
                                                }
                                            </div>
                                            :
                                            <p>{message.content}</p>
                                    }
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/react"
import { Button, ButtonGroup } from "@nextui-org/react"
import { ChannelViewer, ChannelMessage } from "@/components/channels"

import axios from "axios"
import { useEffect, useState } from "react"

type Channel = {
  id: number
  name: string
  type: string
}

export default function IndexPage() {
  let columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Name" },
    { key: "type", name: "Type" },
    { key: "actions", name: "Actions" }
  ]

  const [channels, setChannels] = useState<Channel[]>([])
  const [showChannel, setShowChannel] = useState(false)
  const [showMessageBox, setShowMessageBox] = useState(false)
  const [channelId, setChannelId] = useState<string>("0")

  const getChannels = async () => {
    const response = await axios.get(`${siteConfig.api}/api/bot/channels`)

    const filtered = response.data.filter((channel: Channel) => channel.type !== "Category")
    setChannels(filtered)
  }

  const clickView = (channel_id: string) => {
    setChannelId(channel_id)
    setShowChannel(true)
  }

  const clickMessage = (channel_id: string) => {
    setChannelId(channel_id)
    setShowMessageBox(true)
  }

  useEffect(() => {
    getChannels()
  }, [])

  return (
    <DefaultLayout>
      <ChannelViewer isOpen={showChannel} onClose={() => setShowChannel(false)} channel_id={channelId} />
      <ChannelMessage isOpen={showMessageBox} onClose={() => setShowMessageBox(false)} channel_id={channelId} />

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Table aria-label="Table of channels">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}
          </TableHeader>

          <TableBody>
            {channels.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell>{channel.id}</TableCell>
                <TableCell>{channel.name}</TableCell>
                <TableCell>{channel.type}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button color="primary" onClick={() => clickMessage(channel.id.toString())}>Message</Button>
                    <Button color="secondary" onClick={() => clickView(channel.id.toString())}>View</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </DefaultLayout>
  );
}

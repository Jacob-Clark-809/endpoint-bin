import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getRequest } from "../services/requests";

const RequestDetails = () => {
  const { binId, requestId } = useParams();
  const [request, setRequest] = useState({});

  console.log(request);

  useEffect(() => {
    const fetchRequest = async () => {
      const data = await getRequest(binId, requestId);

      setRequest(data);
    }

    try {
      fetchRequest();
    } catch (e) {
      console.error(e);
    }
  }, [binId, requestId])

  const headers = [];
  if (request.headers) {
    displayJson(request.headers, 0, headers, false);
  }
  
  const body = [];
  if (request.body) {
    displayJson(request.body, 0, body, false);
  }

  console.log('Headers:', headers);
  console.log('Body:', body);

  return (
    <Box>
      <Typography variant="h6">
        Headers:
      </Typography>
      {headers}
      <Typography variant="h6">
        Body:
      </Typography>
      {body}
    </Box>
  )
};

const indentSizePx = 20;

const getMarginLeft = (indentSizePx, depth) => {
  const totalIndentPx = indentSizePx * depth;
  return `${totalIndentPx}px`
}

const formatPrimitive = (primitive) => {
  return typeof primitive === 'string' ? `"${primitive}"` : primitive
}

const displayJson = (json, depth, container, noOpen) => {
  if (Array.isArray(json)) {
    if (!noOpen) {
      container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, depth) }}>{'['}</Typography>);
    }

    for (let index in json) {
      displayJson(json[index], noOpen ? depth : depth + 1, container, false);
    }

    container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, noOpen ? depth - 1 : depth) }}>{']'}</Typography>);
  } else if (typeof json === 'object' && json !== null) {
    if (!noOpen) {
      container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, depth) }}>{'{'}</Typography>);
    }

    for (let key in json) {
      if (typeof json[key] !== 'object' || json[key] === null) {
        container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, noOpen ? depth : depth + 1) }}>{`"${key}": ${formatPrimitive(json[key])}`}</Typography>);
      } else if (Array.isArray(json[key])) {
        container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, noOpen ? depth : depth + 1) }}>{`"${key}": [`}</Typography>);
        displayJson(json[key], noOpen ? depth + 1 : depth + 2, container, true);
      } else {
        container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, noOpen ? depth : depth + 1) }}>{`"${key}": {`}</Typography>);
        displayJson(json[key], noOpen ? depth + 1 : depth + 2, container, true);
      }
    }

    container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, noOpen ? depth - 1 : depth) }}>{'}'}</Typography>);
  } else {
    container.push(<Typography variant="body1" sx={{ marginLeft: getMarginLeft(indentSizePx, depth) }}>{formatPrimitive(json)}</Typography>)
  }
}

export default RequestDetails;
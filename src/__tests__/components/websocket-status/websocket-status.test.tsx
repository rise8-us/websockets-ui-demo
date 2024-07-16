import { WebSocketStatus } from "@/src/components/websocket-status";
import { act, render, screen } from "@testing-library/react";
import { IMessage, mock as stompMock } from "react-stomp-hooks";

// https://github.com/SvenKirschbaum/react-stomp-hooks/issues/37
const mockedMessage = jest.fn<IMessage, any, any>();

jest.mock("react-stomp-hooks", () => ({
  ...jest.requireActual("react-stomp-hooks"),
  useSubscription: (_topic: string, callbackFn: (message: IMessage) => void) => {
    if(mockedMessage.mock.calls.length) return;
    callbackFn(mockedMessage());
  },
}));

describe("components/websocket-status/websocket-status", () => {

  afterEach(() => {
    stompMock.reset();
    mockedMessage.mockClear();
  });

  test("renders null when message is empty", () => {
    mockedMessage.mockReturnValue({ body: JSON.stringify("") } as IMessage);

    const { container } = render(
      <stompMock.StompSessionProviderMock >
        <WebSocketStatus topic="test-topic" />
      </stompMock.StompSessionProviderMock>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("renders message when recieved", () => {
    mockedMessage.mockReturnValue({ 
      body: JSON.stringify({
        message: "test message",
        currentTask: 1,
        totalTasks: 10,
        status: "IN_PROGRESS"
      })
    } as IMessage);

    render(
      <stompMock.StompSessionProviderMock >
        <WebSocketStatus topic="test-topic" />
      </stompMock.StompSessionProviderMock>
    );
    
    act(() => {
      stompMock.mockReceiveMessage('test-topic', {  } as IMessage);
    });

    expect(screen.getByText("test message")).toBeInTheDocument();
  });
});
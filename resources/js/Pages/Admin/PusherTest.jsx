import React, { useEffect } from 'react';
import Pusher from 'pusher-js';

const PusherTest = () => {
  useEffect(() => {
    // Enable Pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('5a7697f73e3c287f4892', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });

    // Clean up
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Pusher Test</h1>
      <p>
        Try publishing an event to channel <code>my-channel</code> with event name <code>my-event</code>.
      </p>
    </div>
  );
};

export default PusherTest;

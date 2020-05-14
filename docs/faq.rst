Frequently Asked Questions
==========================

1.  Docker container is failing due ``ng: not found``.
    
    If you are using ``docker-compose``,
    we use anonymous volume to avoid overwritten ``node_modules``
    by the mounting of the host directory at runtime.
    The error that you are having is probably due user permission.
    Remove your local ``node_modules``
    and let ``docker-compose`` create the one it will use.

2.  ``npm run lint`` fails due ``Cannot find module '@typescript-eslint/parser'``.

    Because you have ``node_modules``,
    Node.js will look into it
    and fail due user permission.
    Use ::

        export NODE_PATH=/usr/lib/node_modules

    to skip the local ``node_modules``.

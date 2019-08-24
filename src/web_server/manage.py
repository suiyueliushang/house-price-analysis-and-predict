#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """主函数，实现接受httprequest并返回响应
    -----------
    author:suiyueliushang
    -----------
    date:2019.8.21
    -----------
    示例
    -------
    >>> a=[1,2,3]
    >>> print [x + 3 for x in a]
    """

    #设置os默认路径
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web_server.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

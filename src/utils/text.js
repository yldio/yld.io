export const command1 = `
$ netstat -pantu - / head
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:45865           0.0.0.0:*               LISTEN      26771/spotify --for
tcp        0      0 0.0.0.0:5355            0.0.0.0:*               LISTEN      -
tcp        0      0 0.0.0.0:57621           0.0.0.0:*               LISTEN      26771/spotify --for
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      -
tcp        0      0 127.0.0.1:6463          0.0.0.0:*               LISTEN      2463/mainScreenPrel
tcp        0      0 192.168.1.159:34672     151.101.16.133:443      ESTABLISHED 8842/chrome
tcp        0      0 192.168.1.159:59696     18.130.74.87:443        ESTABLISHED 17047/slack
tcp        0      0 192.168.1.159:48398     172.217.23.5:443        ESTABLISHED 8842/chrome
`

export const command2 = `
$ ps aux / head
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.1  0.0 215704  9900 ?        Ss   11:34   0:16 /sbin/init
root         2  0.0  0.0      0     0 ?        S    11:34   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        I<   11:34   0:00 [rcu_gp]
root         4  0.0  0.0      0     0 ?        I<   11:34   0:00 [rcu_par_gp]
root         6  0.0  0.0      0     0 ?        I<   11:34   0:00 [kworker/0:0H-kblockd]
root         8  0.0  0.0      0     0 ?        I<   11:34   0:00 [mm_percpu_wq]
root         9  0.0  0.0      0     0 ?        S    11:34   0:00 [ksoftirqd/0]
root        10  0.0  0.0      0     0 ?        I    11:34   0:07 [rcu_preempt]
root        11  0.0  0.0      0     0 ?        I    11:34   0:01 [rcu_sched]
`

import { Request, Response } from 'express'
import faker from 'faker'

export const login = (req: Request, res: Response) => {
  return res.status(200).json(
    {
    code: 'APP0000',
    message: '登陆成功',
    data: {
      token: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTY0MTkyNjg2LCJpYXQiOjE1NjQxNDk0ODZ9.cVHJlCTD1vY95IMdw9UQGARvyxqknYQxb_PXOzF896vtUA4TolF9v5V4fTIpPrZlyO2G4avrkXNYMOFVtmc44A',
      },
    })
}

export const logout = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 'APP0001',
    message: 'ok',
    data: {
      id: faker.random.number,
      name: faker.name.findName(),
      roles: ['admin'],
    },
  })
}

import LogoSimple from "~/Components/atoms/logo-simple"

type ContainerProps = {
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="w-full py-3 px-6">
            <div className="flex flex-col w-full items-center">
                <LogoSimple className="pt-4 self-center" />

                <h4 className="text-gray-700">Crie uma Conta</h4>
                <p className="text-muted">Aproveite todos os Benefícios Agora!</p>
            </div>
            <div className="mt-2">
                {children}
            </div>
        </div>
    )
}

export default Container